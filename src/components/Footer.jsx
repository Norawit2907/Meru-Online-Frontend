import React from "react";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

const Footer = () => {
	return (
		<footer className="footer bg-[#312F32] text-[#E9C649] p-4 ">
            {/* grid */}
			<div className="grid grid-cols-4">
                {/* left-section */}
				<div className="left-section col-span-1">
					<div className="logo flex items-center">
						<img src="../logo.png" alt="Logo" />
						<div className="relative -bottom-1 ml-3">
							<p className="text-white font-serif text-[40px]">MERU-ONLINE</p>
						</div>
					</div>
                    <p className="text-white text-[15px] mr-[50px] ml-[20px]">Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro fuga accusamus obcaecati nobis tenetur aperiam. Non necessitatibus vero labore corrupti!</p>
				</div>

                {/* right-section */}
				<div className="right-section col-span-3 py-[10px] mt-5">

					<h5 className="text-[18px] font-bold">CONTACT INFO</h5>
					<div>
						<p className="text-white">Phone: 1234567890</p>
						<p className="text-white">Email: company@email.com</p>
						<p className="text-white">Location: 100 Smart Street, LA, USA</p>
					</div>

					<div className="flex text-[25px] pt-3 gap-6">
						<FaFacebook/>
						<FaTwitter />
						<FaInstagram />
						<FaLinkedin />
					</div>
                </div>
			</div>

			<hr className="my-5" />
			<div className="text-start mt-3 ml-[20px]">
				<p className="">&copy; 2024 Meru Online. All Rights Reserved.</p>
			</div>
		</footer>
	);
};

export default Footer;
