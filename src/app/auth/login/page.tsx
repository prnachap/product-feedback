import LoginForm from "@/components/FormUI/LoginForm";
import CustomCard from "@/components/UI/CustomCard";

export default function LoginPage() {
  return (
    <main className="flex items-center justify-center md:h-screen mt-16">
      <div className="relative mx-auto flex w-full max-w-[400px] flex-col space-y-2.5 p-4 md:-mt-32">
        <CustomCard className="bg-gradient-to-r from-purple-500 to-pink-500  !px-6 !pt-14 !pb-6 relative">
          <h2 className="secondary-text text-white">Frontend Mentor</h2>
        </CustomCard>
        <LoginForm />
      </div>
    </main>
  );
}
