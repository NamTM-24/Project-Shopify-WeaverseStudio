import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

interface FitGuideProps {
  isOpen: boolean;
  onClose: () => void;
}

export function FitGuide({ isOpen, onClose }: FitGuideProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!isOpen || !mounted) return null;

  return createPortal(
    <div className="z-[9999] fixed inset-0 overflow-hidden overflow-y-auto">
      <div className="flex min-h-screen items-center justify-center md:p-4">
        {/* Backdrop */}
        <div 
          className="fixed inset-0 hidden bg-black/50 transition-opacity md:block"
          onClick={onClose}
        ></div>
        
        {/* Modal Container */}
        <div className="relative min-h-screen w-full max-w-5xl bg-white px-8 pt-14 pb-10 shadow-xl select-none md:min-h-auto md:rounded-3xl md:p-8">
          <button 
            className="fixed top-4 right-4 z-10 flex cursor-pointer items-center justify-center text-gray-500 hover:text-black md:absolute md:top-8 md:right-8" 
            aria-label="Close size chart"
            onClick={onClose}
          >
            <svg className="size-6" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" clipRule="evenodd" d="M8.31539 6.89807C8.12013 6.7028 7.80354 6.7028 7.60828 6.89807C7.41302 7.09333 7.41302 7.40991 7.60828 7.60517L11.7104 11.7073L7.31557 16.1021C7.12031 16.2974 7.12031 16.614 7.31557 16.8092C7.51083 17.0045 7.82742 17.0045 8.02268 16.8092L12.4175 12.4144L16.8007 16.7976C16.9959 16.9928 17.3125 16.9928 17.5078 16.7976C17.703 16.6023 17.703 16.2857 17.5078 16.0905L13.1246 11.7073L17.2151 7.61684C17.4103 7.42157 17.4103 7.10499 17.2151 6.90973C17.0198 6.71447 16.7032 6.71447 16.508 6.90973L12.4175 11.0002L8.31539 6.89807Z" fill="currentColor"></path>
            </svg>
          </button>
          
          <div className="flex h-full flex-col">
            <h2 className="font-regular mx-auto mb-4 text-center text-xl text-black md:text-2xl">Women's Kiwi Slipper</h2>
            <div className="bg-gray-100 mx-auto mb-4 max-w-[500px] rounded-[20px] p-3 text-center text-sm font-medium text-black">
              This style is offered in full sizes only. If you have wide feet or are between sizes we suggest you size up.
            </div>
            
            <div className="mb-11 justify-around gap-x-8 gap-y-8 text-center md:mb-7 md:flex md:justify-center">
              {/* Width Chart */}
              <div className="flex flex-col items-center">
                <div className="relative mx-auto flex w-4/5 max-w-sm items-center justify-center px-6">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 90 119" className="absolute top-1/2 left-1/2 size-full text-gray-600" style={{ transform: "translate(-50%, -50%) scale(0.5)" }}>
                    <path stroke="currentColor" strokeDasharray="2 2" d="M89.453 6.976c-15.283-4.527-54.479-10.866-89 0M.453 111.976c15.283 4.528 54.479 10.867 89 0"></path>
                  </svg>
                  <div className="relative z-10 flex h-full w-full items-center justify-center">
                    <img src="//www.allbirds.com/cdn/shop/files/A12142_25Q4_Kiwi-Slipper-Dark-Camel-Stony-Cream-Sole_PDP_TD_49fe6f45-b3d5-44d6-9ba0-836f9c849d04.png?v=1761687976&amp;width=1024" alt="" className="h-full w-full object-contain" loading="lazy" width="1024" height="1024" />
                  </div>
                </div>
                <div className="mt-auto">
                  <p className="mb-2.5 text-xs font-medium text-black uppercase">Average Width</p>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 215 11" className="m-auto h-auto w-[72%] overflow-visible">
                    <path stroke="#575757" d="M.5 6H213" opacity=".3"></path>
                    <circle cx="3" cy="5.5" r="2.5" fill="#fff" stroke="#575757"></circle>
                    <circle cx="54" cy="5.5" r="2.5" fill="#fff" stroke="#575757"></circle>
                    <circle cx="105" cy="5.5" r="5.5" fill="#212121"></circle>
                    <circle cx="156" cy="5.5" r="2.5" fill="#fff" stroke="#575757"></circle>
                    <circle cx="209.5" cy="5.5" r="2.5" fill="#fff" stroke="#575757"></circle>
                  </svg>
                </div>
              </div>

              {/* Length Chart */}
              <div className="flex flex-col items-center">
                <div className="relative mx-auto flex w-4/5 max-w-sm items-center justify-center px-6">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 214 62" className="absolute top-1/2 left-1/2 size-full text-gray-600" style={{ transform: "translate(-50%, -50%) scale(0.9)" }}>
                    <path stroke="currentColor" strokeDasharray="1.6 1.6" d="M14 1C4.19 11.303-9.544 37.727 14 61M200 61c9.81-10.303 23.544-36.727 0-60"></path>
                  </svg>
                  <div className="relative z-10 flex h-full w-full items-center justify-center">
                    <img src="//www.allbirds.com/cdn/shop/files/A12142_25Q4_Kiwi-Slipper-Dark-Camel-Stony-Cream-Sole_PDP_LEFT.png?v=1761687976&amp;width=1024" alt="" className="h-full w-full object-contain" loading="lazy" width="1024" height="1024" />
                  </div>
                </div>
                <div className="mt-auto">
                  <p className="mb-2.5 text-xs font-medium text-black uppercase">Average Length</p>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 215 11" className="m-auto h-auto w-[72%] overflow-visible">
                    <path stroke="#575757" d="M.5 6H213" opacity=".3"></path>
                    <circle cx="3" cy="5.5" r="2.5" fill="#fff" stroke="#575757"></circle>
                    <circle cx="54" cy="5.5" r="2.5" fill="#fff" stroke="#575757"></circle>
                    <circle cx="105" cy="5.5" r="5.5" fill="#212121"></circle>
                    <circle cx="156" cy="5.5" r="2.5" fill="#fff" stroke="#575757"></circle>
                    <circle cx="209.5" cy="5.5" r="2.5" fill="#fff" stroke="#575757"></circle>
                  </svg>
                </div>
              </div>
            </div>

            <div className="mt-auto w-full">
              <div className="mb-6 flex flex-col items-center gap-2 md:flex-row md:gap-5">
                <h3 className="text-center text-sm font-medium text-black uppercase">Our Shoes are Unisex</h3>
                <p className="text-gray-600 text-center text-sm leading-none md:text-xs">If you wear a women's size 11.5-12, try a men's size 10.5-11. If you wear a men's size 7-7.5, try a women's size 8-8.5.</p>
              </div>
              
              <div className="relative mb-6 block w-full">
                <div className="scrollbar-hidden border-gray-300 w-full overflow-x-auto rounded-[20px] border">
                  <div role="table" aria-label="Size Chart Table" className="flex w-full md:block">
                    {/* Row 3 - US */}
                    <div role="row" aria-label="Row 3" className="flex w-full flex-col md:w-auto md:flex-row border-b border-gray-200 md:border-b-0">
                      <div className="flex h-full items-center w-full min-w-[70px] flex-row justify-center px-4 py-3 text-center text-sm text-gray-700 md:flex-col bg-gray-100 first:min-w-[55px] first:text-left first:font-medium first:text-black">US</div>
                      <div className="flex w-full min-w-[70px] flex-row justify-center px-4 py-3 text-center text-sm text-gray-700 md:flex-col bg-white first:min-w-[55px] first:text-left first:font-medium first:text-black">5</div>
                      <div className="flex w-full min-w-[70px] flex-row justify-center px-4 py-3 text-center text-sm text-gray-700 md:flex-col bg-gray-100 first:min-w-[55px] first:text-left first:font-medium first:text-black">6</div>
                      <div className="flex w-full min-w-[70px] flex-row justify-center px-4 py-3 text-center text-sm text-gray-700 md:flex-col bg-white first:min-w-[55px] first:text-left first:font-medium first:text-black">7</div>
                      <div className="flex w-full min-w-[70px] flex-row justify-center px-4 py-3 text-center text-sm text-gray-700 md:flex-col bg-gray-100 first:min-w-[55px] first:text-left first:font-medium first:text-black">8</div>
                      <div className="flex w-full min-w-[70px] flex-row justify-center px-4 py-3 text-center text-sm text-gray-700 md:flex-col bg-white first:min-w-[55px] first:text-left first:font-medium first:text-black">9</div>
                      <div className="flex w-full min-w-[70px] flex-row justify-center px-4 py-3 text-center text-sm text-gray-700 md:flex-col bg-gray-100 first:min-w-[55px] first:text-left first:font-medium first:text-black">10</div>
                      <div className="flex w-full min-w-[70px] flex-row justify-center px-4 py-3 text-center text-sm text-gray-700 md:flex-col bg-white first:min-w-[55px] first:text-left first:font-medium first:text-black">11</div>
                    </div>
                    {/* Row 4 - UK */}
                    <div role="row" aria-label="Row 4" className="flex w-full flex-col md:w-auto md:flex-row border-b border-gray-200 md:border-b-0">
                      <div className="flex h-full items-center w-full min-w-[70px] flex-row justify-center px-4 py-3 text-center text-sm text-gray-700 md:flex-col bg-gray-100 first:min-w-[55px] first:text-left first:font-medium first:text-black">UK</div>
                      <div className="flex w-full min-w-[70px] flex-row justify-center px-4 py-3 text-center text-sm text-gray-700 md:flex-col bg-white first:min-w-[55px] first:text-left first:font-medium first:text-black">2 - 2.5</div>
                      <div className="flex w-full min-w-[70px] flex-row justify-center px-4 py-3 text-center text-sm text-gray-700 md:flex-col bg-gray-100 first:min-w-[55px] first:text-left first:font-medium first:text-black">3 - 3.5</div>
                      <div className="flex w-full min-w-[70px] flex-row justify-center px-4 py-3 text-center text-sm text-gray-700 md:flex-col bg-white first:min-w-[55px] first:text-left first:font-medium first:text-black">4-4.5</div>
                      <div className="flex w-full min-w-[70px] flex-row justify-center px-4 py-3 text-center text-sm text-gray-700 md:flex-col bg-gray-100 first:min-w-[55px] first:text-left first:font-medium first:text-black">5 - 5.5</div>
                      <div className="flex w-full min-w-[70px] flex-row justify-center px-4 py-3 text-center text-sm text-gray-700 md:flex-col bg-white first:min-w-[55px] first:text-left first:font-medium first:text-black">6 - 6.5</div>
                      <div className="flex w-full min-w-[70px] flex-row justify-center px-4 py-3 text-center text-sm text-gray-700 md:flex-col bg-gray-100 first:min-w-[55px] first:text-left first:font-medium first:text-black">7 - 7.5</div>
                      <div className="flex w-full min-w-[70px] flex-row justify-center px-4 py-3 text-center text-sm text-gray-700 md:flex-col bg-white first:min-w-[55px] first:text-left first:font-medium first:text-black">8 - 8.5</div>
                    </div>
                    {/* Row 5 - cm */}
                    <div role="row" aria-label="Row 5" className="flex w-full flex-col md:w-auto md:flex-row">
                      <div className="flex h-full items-center w-full min-w-[70px] flex-row justify-center px-4 py-3 text-center text-sm text-gray-700 md:flex-col bg-gray-100 first:min-w-[55px] first:text-left first:font-medium first:text-black">cm</div>
                      <div className="flex w-full min-w-[70px] flex-row justify-center px-4 py-3 text-center text-sm text-gray-700 md:flex-col bg-white first:min-w-[55px] first:text-left first:font-medium first:text-black">22</div>
                      <div className="flex w-full min-w-[70px] flex-row justify-center px-4 py-3 text-center text-sm text-gray-700 md:flex-col bg-gray-100 first:min-w-[55px] first:text-left first:font-medium first:text-black">23</div>
                      <div className="flex w-full min-w-[70px] flex-row justify-center px-4 py-3 text-center text-sm text-gray-700 md:flex-col bg-white first:min-w-[55px] first:text-left first:font-medium first:text-black">24</div>
                      <div className="flex w-full min-w-[70px] flex-row justify-center px-4 py-3 text-center text-sm text-gray-700 md:flex-col bg-gray-100 first:min-w-[55px] first:text-left first:font-medium first:text-black">25</div>
                      <div className="flex w-full min-w-[70px] flex-row justify-center px-4 py-3 text-center text-sm text-gray-700 md:flex-col bg-white first:min-w-[55px] first:text-left first:font-medium first:text-black">26</div>
                      <div className="flex w-full min-w-[70px] flex-row justify-center px-4 py-3 text-center text-sm text-gray-700 md:flex-col bg-gray-100 first:min-w-[55px] first:text-left first:font-medium first:text-black">27</div>
                      <div className="flex w-full min-w-[70px] flex-row justify-center px-4 py-3 text-center text-sm text-gray-700 md:flex-col bg-white first:min-w-[55px] first:text-left first:font-medium first:text-black">28</div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="relative h-1 w-full rounded-[4px] bg-gray-100 md:hidden">
                 {/* Scroll indicator for mobile - static for now as simplistic version */}
                 <span className="absolute inset-0 h-full w-full rounded-[4px] bg-black opacity-10"></span>
                 <span className="absolute top-0 bottom-0 left-0 h-full w-2/6 cursor-pointer rounded-[4px] bg-black opacity-20"></span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}
