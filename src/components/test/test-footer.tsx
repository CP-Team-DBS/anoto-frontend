"use client";

export default function TestFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#0E103D] text-white pt-4 pb-8 font-sans mt-auto">
      <div className="max-w-[90%] mx-auto">
        <hr className="border-t-[3px] border-[#F5F3FF]" />

        <div className="flex flex-col md:flex-row justify-between items-center pt-6">
          <div className="font-extrabold text-xl font-inter">Anoto</div>

          <div className="mt-3 md:mt-0 text-white/80 text-sm font-medium">
            © {currentYear} Anoto. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}
