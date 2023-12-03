import {ContactUs} from "./contact-us";
import {Faqs} from "./faqs";
import {Features} from "./features";
import {Hero} from "./hero";
import {HowItWorks} from "./how-it-works";
import {Screenshots} from "./screenshots";
import {Testimonials} from "./testimonials";

export default async function Index() {
	return (
		<>
			<Hero />
			<Screenshots />
			<Features />
			<HowItWorks />
			<Testimonials />
			<Faqs />
			<ContactUs />
		</>
	);
}
