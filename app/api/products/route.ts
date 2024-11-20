
import Collection from "@/lib/models/Collection";
import Product from "@/lib/models/Product";
import { connectToDB } from "@/lib/mongoDB";
import { auth } from "@clerk/nextjs/server";

import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    await connectToDB();

    const { title, description, media, category, collections, tags, sizes, colors, price, expense } = await req.json();

    if (!title || !description || !media || !category || !collections || !tags || !sizes || !colors || !price || !expense) {
      return new NextResponse("Bad Request", { status: 400 });
    }

    const newProduct = await Product.create({
      title,
      description,
      media,
      category,
      collections,
      tags,
      sizes,
      colors,
      price,
      expense,
    });

    // Save the product
    await newProduct.save();

    // Update collections with the new product's ObjectId
    if (collections) {
      for (const collectionId of collections) {
        const collection = await Collection.findById(collectionId);
        if (collection) {
          collection.products.push(newProduct._id); // Push only the _id of the new product
          await collection.save();
        }
      }
    }


    return NextResponse.json(newProduct, { status: 201 });

  } catch (error) {
    console.log("[collections_POST] :", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
};



export const GET = async (req: NextRequest) => {
  try {
    await connectToDB();

    const products = await Product.find()
      .sort({ createdAt: "desc" })
      .populate({ path: "collections", model: Collection });

    return NextResponse.json(products, { status: 200 });

  } catch (error) {
    console.log("[products] :", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
};