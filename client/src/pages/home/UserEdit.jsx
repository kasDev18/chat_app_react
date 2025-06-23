import EditAvatar from "../../components/users/EditAvatar";
import EditForm from "../../components/users/EditForm";
export default function UserEdit() {
  return (
    <main className="h-screen w-screen p-5 flex flex-col items-center">
      <h1 className="text-2xl font-bold text-amber-500">Edit Profile</h1>&nbsp;
      <div className="flex flex-col md:flex-row w-full">
        <div className="flex flex-col gap-3 md:w-[70%] md:h-[80vh] w-full user-avatar-section">
          <section className="user-avatar-section">
            <EditAvatar />
          </section>
          <section className="user-form-section">
            <EditForm />
          </section>
        </div>
        <section className="md:px-5 flex flex-col justify-between gap-3 md:w-[30%] w-full user-analytics-section">
          <div className="p-5 bg-gray-800 border-2 border-gray-700 rounded-2xl h-[79.2vh]">
            hey
          </div>
        </section>
      </div>
    </main>
  );
}
