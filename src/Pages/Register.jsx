import background from "../assets/sport-background.jpg";
import axios from "axios";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Toaster, toast } from "sonner";
import { useNavigate } from "react-router-dom";

export default function Register() {
    const Navigate = useNavigate();
    const { register, handleSubmit, formState: { errors }} = useForm();

    async function handleRegistration(data) {
        try {
            let response = await axios.post("http://localhost:3000/auth/register", data);

            if (!response) {
                return toast.error("Oops! The registration was not completed.");
            }
            toast.success("You have registered successfully!");
            setTimeout(()=>Navigate('/login'), 2000)
        } catch (e) {
            console.error(e);
            toast.error("Something went wrong!");
        }
    }

    return (
        <>
            <Toaster position="bottom-right" />
            <section className="min-h-screen flex items-stretch text-white">
                <div className="lg:flex w-1/2 hidden bg-orange-400 bg-no-repeat bg-cover relative items-center">
                    <div className="absolute bg-orange-600 opacity-60 inset-0 z-0"></div>
                    <div className="w-full px-24 z-10">
                        <h1 className="text-5xl font-bold text-left tracking-wide">Keep it special</h1>
                        <p className="text-3xl my-4">Capture your events' memory uniquely, anywhere.</p>
                    </div>
                </div>
                <div className="lg:w-1/2 w-full flex items-center justify-center text-center md:px-16 px-0 z-0" style={{ backgroundImage: `url(${background})`, backgroundSize: "cover", backgroundPosition: "center"}}>
                    <div className="w-full py-6 z-20 my-6 backdrop-blur-sm bg-white/30">
                        <h1 className="my-6 font-bold text-2xl text-orange-600">Logo</h1>
                        <form onSubmit={handleSubmit(handleRegistration)} className="sm:w-2/3 w-full px-4 lg:px-0 mx-auto">
                            <div className="pb-2 pt-4">
                                <input {...register("name", { required: "Name is required", minLength: 3, maxLength: 30 })} className="block w-full p-3 rounded-md border-lime-50 placeholder-orange-600 text-orange-600" style={{ background: "#fcf3e4" }} type="text" placeholder="Name"/>
                                {errors.name && <span>{errors.name.message}</span>}
                            </div>
                            <div className="pb-2 pt-4">
                                <input {...register("organisationName", {minLength: 3, maxLength: 50})} className="block w-full p-3 rounded-md border-lime-50 placeholder-orange-600 text-orange-600" style={{ background: "#fcf3e4" }} type="text" placeholder="Organisation Name"/>
                                {errors.organisationName && <span>Invalid organisation name length</span>}
                            </div>
                            <div className="pb-2 pt-4">
                                <input {...register("email", {required: "Email is required", pattern: { value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/, message: "Invalid email address"}})} type="email" placeholder="Email" className="text-orange-600 block w-full p-3 rounded-md border-lime-50 placeholder-orange-600" style={{ background: "#fcf3e4" }}/>
                                {errors.email && <span>{errors.email.message}</span>}
                            </div>
                            <div className="pb-2 pt-4">
                                <input {...register("password", { required: "Password is required", pattern: { value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*]).{8,}$/, message: "Password must be strong and at least 8 characters"}})} className="block w-full p-3 rounded-md border-lime-50 placeholder-orange-600 text-orange-600" style={{ background: "#fcf3e4" }} type="password" placeholder="Password"/>
                                {errors.password && <span>{errors.password.message}</span>}
                            </div>
                            <div className="text-right text-lime-50">
                                <Link to="/Login">You already have an account?</Link>
                            </div>
                            <div className="py-4">
                                <button type="submit" className="w-full text-center py-3 rounded bg-orange-600 text-white hover:bg-orange-800 focus:outline-none my-1">
                                    Register
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </section>
        </>
    );
}
