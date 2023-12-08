const Footer = () => {
    return (
      <>
      <div className="mt-8 w-full bg-gray-100 px-8 md:px-[400px] flex md:flex-row flex-col space-y-4 md:space-y-0 items-start md:justify-between text-sm md:text-md py-8 shadow-2xl">
          <div className="flex flex-col text-black">
              <p className="font-semibold">OFFICES</p>
              <p>Street "Abbey Road" 51,</p>
              <p className="mb-2">London, UK</p>
              <p>Street "Kliment Ohridski" 109,</p>
              <p>Sofia, BG</p>
          </div>

          <div className="flex flex-col text-black">
          <p className="font-semibold">CATEGORIES</p>
              <p>Cars</p>
              <p>Automotive</p>
              <p>Forum</p>
              <p>Q&A</p>
          </div>

          <div className="flex flex-col text-black">
          <p className="font-semibold">CONTACT US</p>
              <p>Email: autoforum@gmail.com</p>
              <p>Phone: +359 88 302 4231</p>
              <p>Fax: +359 8548 302 4231</p>
          </div>
      </div>
      <p className="py-2 pb-4 text-center text-sm" >All rights reserved &copy; 2023</p>
      </>
      
    )
  }
  
  export default Footer