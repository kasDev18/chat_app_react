import { useAuthContext } from "../../context/AuthContext"


export default function Analytics() {
    const { authUser } = useAuthContext();
    return (
        <div className="p-5 bg-gray-800 border-2 border-gray-700 rounded-2xl h-[97%]">
            <h3 className="lg:text-md text-xs font-bold text-gray-500">{authUser.fullName}'s Analytics</h3>
        </div>
    )
}