import EditForm from "../../components/users/EditForm";
import { useAuthContext } from "../../context/AuthContext";
export default function UserEdit() {
  const { authUser } = useAuthContext();
  return (
    <main className="h-screen w-screen p-5">
      <h1 className="text-2xl font-bold text-amber-500">Edit Profile</h1>&nbsp;
      <div className="flex">
        <section className="flex flex-col gap-3 w-[70%] h-[80vh]">
          <div className="flex items-center justify-center gap-3 border-2 border-gray-700 pb-3 bg-gray-800 p-5 rounded-2xl">
            <img
              className="rounded-full border-2 border-amber-500"
              width={110}
              src="https://th.bing.com/th/id/R.e2a8b23a278ed28d089dc4a87dbf50ef?rik=35UwSrV89r9CCw&riu=http%3a%2f%2fgcraftupvc.in%2fassets%2fimages%2fabout%2fabout-shape.png&ehk=xkGFVBAk88y56o6rUD%2fKI%2f0Ke3B28bVGUw8Eebtrjxs%3d&risl=&pid=ImgRaw&r=0"
              alt=""
            />
            <div className="flex flex-col justify-center items-center">
              <button className="btn btn-active bg-gray-900 btn-md hover:bg-[#984FD2] hover:text-white text-white border-2 hover:border-white border-gray-600">
                Upload new photo
              </button>
              <p className="text-gray-500 text-sm">{authUser.emailAddress}</p>
            </div>
          </div>
          <EditForm />
        </section>
        <section className="px-5 flex flex-col justify-between gap-3 w-[30%]">
          <div className="p-5 bg-gray-800 border-2 border-gray-700 rounded-2xl h-[79.2vh]">
            hey
          </div>
        </section>{" "}
      </div>
    </main>
  );
}
