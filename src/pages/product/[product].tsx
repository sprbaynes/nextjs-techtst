import Image from "next/image";
import { Geist, Geist_Mono } from "next/font/google";
import Link from 'next/link';

export type ProductProps = {
    id: number,
    brand: string,
    category: string,
    description: string,
    images: string[],
    price: number,
    stock: number,
    thumbnail:string,
    title: string
}

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export async function getStaticPaths() {
  const paths:any = [];
  const getStaticPathsObj = {
      paths:paths,
      fallback:'blocking'
  }
  
  const res = await fetch(process.env.NEXT_PUBLIC_API_URL || '')
  const products = await res.json()
  
  products.forEach((product:any)=>{

      getStaticPathsObj.paths.push(
          {
              params:{product: ''+product.id}
          }
      )       
  })

  return getStaticPathsObj;
}

export async function getStaticProps<ProductProps>(context: any) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || ''}${context.params.product}`)
  const product = await res.json()

  return {
    props: { ...product }
  }
}

export default function Products({id, brand, category, description, images, price, stock, thumbnail, title}:ProductProps) {

  return (
    <div
      className={`${geistSans.className} ${geistMono.className} grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]`}
    >
      <header>
        Header
      </header>
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <div>
          <Link href="/">&lt;&nbsp;Back to product list</Link>
        </div>
        <div className="border rounded-lg p-4">
          <div className="justify-items-center">
            <Image src={images[0]} alt={title} width="400" height="400"/>
          </div>
          <div className=""><h1>{title}</h1></div>
          <div className="font-bold text-sm capitalize">{category}</div>
          <div className="">{stock} in stock</div>
          <div className="font-bold">£{price}</div>
          <div>{description}</div>
        </div>
      </main>
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
          Footer
      </footer>
    </div>
  );
}
