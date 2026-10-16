import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { Product } from "@/types";
import { getProducts } from "@/features/products/api";
import { Carousel } from "@/components/carousel";

export default async function Home() {
  const products=await getProducts();
  const product: Product = products[0];
  return (
    
<div>
  <section className="rounded-2xl bg-neutral-100 px-6 py-10 sm:px-12 sm:py-16">
    <div className="grid grid-cols-1 items-center gap-8 md:grid-cols-2">

      <div>
        <h1 className="text-4xl font-bold tracking-tight text-neutral-900 md:text-4xl">
          WELCOME TO GEBEYA <br /> E-COMMERCE
        </h1>

        <p className="mt-4 text-neutral-600">
          Your one-stop shop for all your needs!
        </p>

        <Button
          variant="default"
          size="default"
          className="mt-6 rounded-full bg-black px-6 py-6 text-white hover:bg-gray-800"
        >
          <Link href="/products">
            Browse all products
          </Link>
        </Button>
      </div>

      <div className="flex justify-center">
        <Image
          alt="Hero Image"
          className="rounded-2xl object-cover shadow-md"
          width={450}
          height={450}
          src={product.images[1]}
        />
      </div>

    </div>

    <section className="pt-12">
      <Carousel products={products} />
    </section>
  </section>
</div>

  );
}