import Image from "next/image";
import { Geist, Geist_Mono } from "next/font/google";

import type { ProductProps } from "./product/[product]";
import Link from 'next/link';


export type ProductsProps = {
  products: ProductProps[]
}

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export async function getStaticProps<ProductsProps>(context: any) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || ''}`)
  const products= await res.json()

  return {
    props: { products }
  }
}

export default function Home({products}: ProductsProps) {

  //TODO: extract this out to a component
  const productslist = products.map(({id, brand, category, description, images, price, stock, thumbnail, title}:ProductProps)=>{
    return (
      <div className="border rounded-lg p-4">
        <div className="justify-items-center">
          <Image src={thumbnail} alt={title} width="150" height="150"/>
        </div>
        <div><Link className="underline hover:font-bold" href={`/product/${id}`}>{title}</Link></div>
        <div className="font-bold text-sm capitalize">{category}</div>
        <div className="font-bold">£{price}</div>
      </div>
    )
  })

  return (
    <div
      className={`${geistSans.className} ${geistMono.className} grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]`}
    >
      <header>
        Header
      </header>
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
      <h1>Products list</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {productslist}
        </div>
      </main>
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
          Footer
      </footer>
    </div>
  );
}
