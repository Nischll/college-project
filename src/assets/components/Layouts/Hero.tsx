function Hero({children}) {

  return (
    <>
    <div className="relative grid grid-cols-9 bg-gray-100 h-screen">
      <main className="relative col-start-3 col-end-8 flex flex-col justify-center items-center">
        <div className="grid grid-cols-9 grid-rows-3 ">
          <section className="col-span-3 row-start-2 px-2">
            <div className="grid grid-cols-4 grid-rows-2 gap-y-4">
              <img src="src\images\lines.png" alt="" className="col-start-2 col-end-4 h-[45px] laptop:h-[55px]"/>
              <img src="src\images\inventory-logo.png" alt="inventory logo" className="row-start-2 col-span-5 tablet:h-[55px] laptop:h-[65px]"/>
            </div>
          </section>

          <section className="col-start-5 col-end-10 row-span-3 px-2">
          {/* {initialPage === "login" ? <Demo/> : <Demo2/>} */}
          {children}
          </section>
        </div>
      </main>
    </div>
    </>
  )
}
export default Hero;