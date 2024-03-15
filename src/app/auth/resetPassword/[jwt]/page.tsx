import ResetPasswordForm from "@/components/ResetPasswordForm";
import { verifyJwt } from "@/lib/jwt";

interface Props {
    params: {
        jwt: string;
    };
}

const ResetPasswordPage = ({ params }: Props) => {
    const payload = verifyJwt(params.jwt);
    if (!payload)
        return (
            <div className="flex items-center justify-center h-screen text-red-500 text-2xl">
                <p className=" bg-zinc-800 py-2 px-4 rounded-lg text-center">
                    The link is invalid or expired. <br /> Please request a new link to reset your password.
                </p>
            </div>
        );
    return (
        <div className="flex justify-center">
            <ResetPasswordForm jwtUserId={params.jwt} />
        </div>
    );
};

export default ResetPasswordPage;