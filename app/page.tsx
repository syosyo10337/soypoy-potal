"use client";

import Layout from "./components/Layout";
// import Button from "./components/Button";

export default function Home() {
  return (
    <Layout>
      <div className="relative flex items-center justify-center h-[calc(100vh-200px)] min-h-[500px]">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-white text-2xl sm:text-4xl md:text-4xl lg:text-6xl xl:text-6xl font-bold mb-4 tracking-wider">
            好きに生きて、一緒に生きる
          </h1>
          {/* <h2 className="text-white text-xl md:text-3xl font-medium mb-12 tracking-widest">
            COMMUNITY BAR
          </h2> */}
          {/* <Button href="/about" className="text-lg tracking-wide">LEARN MORE</Button> */}
        </div>
      </div>
    </Layout>
  );
}
