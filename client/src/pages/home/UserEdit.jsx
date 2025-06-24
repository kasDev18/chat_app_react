import Analytics from "../../components/users/Analytics";
import EditAvatar from "../../components/users/EditAvatar";
import EditForm from "../../components/users/EditForm";
export default function UserEdit() {
  return (
    <main className="h-screen w-screen md:py-5 md:px-0 p-5 flex flex-col items-center">
      <div className="flex flex-col lg:w-3/4 md:w-[90%] w-full">
        <div className="flex md:justify-start justify-center md:mb-2 lg:mb-0">
          <h1 className="text-3xl font-bold text-amber-500">Edit Profile</h1>
        </div>
        <br className="md:hidden lg:flex"/>
        <div className="flex flex-col md:flex-row w-full items-center">
          <div className="flex flex-col w-full user-avatar-section h-full">
            <section className="user-avatar-section">
              <EditAvatar />
            </section>
            <section className="user-form-section">
              <EditForm />
            </section>
          </div>
          <section className="md:pl-5 flex flex-col md:w-[65%] w-full h-full justify-between gap-3 user-analytics-section">
            <Analytics />
          </section>
        </div>
      </div>
    </main>
  );
}
