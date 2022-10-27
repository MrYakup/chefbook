const DashFooter = () => {
  const content = (
    <footer className="dash-footer">
      <div className="mt-1">
        <div className="flex justify-around items-end border-b-2 border-gray-100 sm:justify-between sm:px-4">
          <div className="flex flex-col  gap-y-4 lg:w-0 lg:flex-1 ">
            
          </div>

          <div className=" grid grid-cols-2 gap-x-4  md:flex ">
            
          </div>
        </div>
        <div className="flex justify-between items-center py-6 pr-2">
          <span></span>
          <p className="text-sm">
            © 2020 Flowbase. Powered by{" "}
            <span className="text-red-500">Webflow</span>
          </p>
          <div className="flex gap-3 pr-1 md:mr-4">
            <div className="lg:w-6 lg:flex-1 ">
              <a href="#?">
                <img className="h-4" src="/photos/twitter.svg" alt="" />
              </a>
            </div>
            <div className="lg:w-6 lg:flex-1 ">
              <a href="#?">
                <img className="h-4" src="/photos/instagram.svg" alt="" />
              </a>
            </div>
            <div className="lg:w-6 lg:flex-1 ">
              <a href="#?">
                <img className="h-4" src="/photos/facebook.svg" alt="" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
  return content;
};
export default DashFooter;
