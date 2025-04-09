import loginImage from "@/assets/auth-image.png";

const AuthImageSection = () => {
  return (
    <div
      className="hidden md:block w-1/2 bg-cover bg-center"
      style={{ backgroundImage: `url(${loginImage})` }}
    />
  );
};

export default AuthImageSection;
