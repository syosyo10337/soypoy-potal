export default function Acsess({ className }: { className: string }) {
  return (
    <div className={`flex flex-col md:flex-row md:justify-between gap-6 ${className}`}>
      <div className="text-left">
        <h2 className="text-[32px] font-bold">Access</h2>
        <div className="text-lg">
          <div className="px-1 mb-2">
            <p>〒155-0031</p>
            <p>東京都世田谷区北沢2丁目30 - 14</p>
            <p>重宗ビル 3F</p>
          </div>
          <p>下北沢駅から 東口から徒歩1分</p>
        </div>
      </div>
      <div className="my-2 md:my-0 w-full md:w-[50%]">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3241.573630504101!2d139.6650984771045!3d35.6628750725932!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6018f3a985c43219%3A0xef11c14b0d78af2f!2sSOY-POY!5e0!3m2!1sen!2sjp!4v1759246272351!5m2!1sen!2sjp"
          title="Google Map"
          width="100%"
          height="100%"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen
        />
      </div>
    </div>
  );
}
