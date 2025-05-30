import Container from "../ui/container";

export default function FooterSection() {
  return (
    <footer className="bg-[#0E103D] text-white pt-8 pb-4 font-sans">
      <Container>
        <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-8 border-b border-white/70 pb-6">
          <div className="md:w-1/3">
            <div className="font-bold text-[40px] leading-tight">Anoto</div>
            <div className="mt-4 text-[20px] font-normal leading-snug max-w-md text-white/90">
              Anoto adalah ruang menulis reflektif<br />
              berbasis NLP untuk bantu kamu mengenali<br />
              dan merawat kesehatan mental.
            </div>
          </div>
          <div className="flex flex-1 flex-row justify-end gap-20 mt-4 md:mt-0">
            <div className="flex flex-col gap-4 text-[20px] font-normal min-w-[180px]">
              <span>Mulai Menulis</span>
              <span>Tentang Anoto</span>
              <span>Panduan Penggunaan</span>
            </div>
            <div className="flex flex-col gap-4 text-[20px] font-normal min-w-[180px]">
              <span>Dukungan & Bantuan</span>
              <span>Kebijakan Privasi</span>
              <span>Kontak Kami</span>
            </div>
          </div>
        </div>
        <div className="text-center text-[20px] font-normal mt-8 text-white/100">
          © 2025 Anoto. All rights reserved.
        </div>
      </Container>
    </footer>
  );
}
