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

export async function getStaticProps<ProductsProps>(context) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || ''}`)
  const products= await res.json()

  return {
    props: { products }
  }
}

export default function Home({products}: ProductsProps) {

  const productslist = products.map(({id, brand, category, description, images, price, stock, thumbnail, title}:ProductProps)=>{
    return (
      <div>
        <Image src={thumbnail} alt={title} width="150" height="150"/>
        <div><Link href={`/product/${id}`}>{title}</Link></div>
        <div>£{price}</div>
      </div>
    )
  })

  return (
    <div
      className={`${geistSans.className} ${geistMono.className} grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]`}
    >
      <header>
        <h1>Header</h1>
      </header>
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
      <h1>Main</h1>
        <div className="flex gap-4 items-center flex-col sm:flex-row">
          {process.env.NEXT_PUBLIC_API_URL}
        </div>
        {productslist}
      </main>
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
          <h1>Footer</h1>
      </footer>
    </div>
  );
}
