import { activateUser } from "@/lib/actions/authActions";
import { verifyJwt } from "@/lib/jwt";

interface Props {
    params: {
        jwt: string;
    };
}

const ActivationPage = async ({ params }: Props) => {
    const result = await activateUser(params.jwt);
    return (
        <div className="h-screen flex flex-col items-center justify-center">
            {result === "userNotExist" ? (
                <p className="text-red-500 text-2xl bg-zinc-800 py-2 px-4 rounded-lg">The user does not exist</p>
            ) : result === "alreadyActivated" ? (
                <p className="text-red-500 text-2xl bg-zinc-800 py-2 px-4 rounded-lg">The user is already activated</p>
            ) : result === "success" ? (
                <p className="text-green-500 text-2xl bg-zinc-800 py-2 px-4 rounded-lg">
                    Success! The user is now activated
                </p>
            ) : (
                <p className="text-yellow-500 text-2xl bg-zinc-800 py-2 px-4 rounded-lg">Oops! Something went wrong!</p>
            )}
        </div>
    );
};

export default ActivationPage;