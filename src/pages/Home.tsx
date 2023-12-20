// type Props = {}
import AnimatedText from "@/components/ui/AnimatedText";
import { motion } from "framer-motion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import LoginForm from "@/components/LoginForm";
import RegisterForm from "@/components/RegisterForm";
import { useAuth } from "@/store/auth-context";

const Home = () => {
  const { isAuthenticated, user } = useAuth();
  return (
    <motion.div
      initial={{ opacity: 0, transform: `translateY(50px)` }}
      whileInView={{ opacity: 1, transform: `translateY(0px)` }}
      exit={{ opacity: 0, transform: `translateY(50px)` }}
      className={`flex h-screen w-full flex-row justify-around border-b-[1px] border-gray-300  shadow-md`}
    >
      <section className="flex flex-col w-full">
        <div className="flex mb-10 flex-col justify-center w-full">
          {isAuthenticated && (
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
              <h2 className="mt-4 text-center text-3xl font-bold leading-9 tracking-tight ">
                <AnimatedText>
                  Welcome Back {user?.firstName + " " + user?.lastName}
                </AnimatedText>
              </h2>
              <h2 className="mt-4 text-center text-3xl font-bold leading-9 tracking-tight ">
                Your Roles :
                <ul>
                  {user?.roles.map(role => <li key={role.id}>{role.name}</li>)}
                </ul>
              </h2>
            </div>
          )}
          {!isAuthenticated && (
            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
              <Tabs defaultValue="account" className="w-[500px]">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="account">Sign in</TabsTrigger>
                  <TabsTrigger value="password">Sign up</TabsTrigger>
                </TabsList>
                <TabsContent value="account">
                  <LoginForm />
                </TabsContent>
                <TabsContent value="password">
                  <RegisterForm />
                </TabsContent>
              </Tabs>
            </div>
          )}
        </div>
      </section>
    </motion.div>
  );
};

export default Home;

{
  /* <a
          href="/students"
          className=" border border-blue-500 overflow-hidden rounded-lg has-shadow py-4 flex flex-col gap-2 col-span-12 md:col-span-6 lg:col-span-3 hover:cursor-pointer transform transition-transform duration-300 has-shadow hover:scale-105"
        >
          <div className="flex justify-center flex-col w-full h-full items-center">
            <img
              width="80"
              height="80"
              src="/images/student.png"
              alt="student"
            />
            <h3 className="text-xl ms-2 font-semibold mt-2">Students</h3>
          </div>
        </a>
        <a
          href="/roles"
          className=" border border-blue-500 overflow-hidden rounded-lg has-shadow py-4 flex flex-col gap-2 col-span-12 md:col-span-6 lg:col-span-3 hover:cursor-pointer transform transition-transform duration-300 has-shadow hover:scale-105"
        >
          <div className="flex justify-center flex-col w-full h-full items-center">
            <img width="80" height="80" src="/images/role.png" alt="role" />
            <h3 className="text-xl ms-2 font-semibold">Roles</h3>
          </div>
        </a>
        <a
          href="/filieres"
          className=" border border-blue-500 overflow-hidden rounded-lg has-shadow py-4 flex flex-col gap-2 col-span-12 md:col-span-6 lg:col-span-3 hover:cursor-pointer transform transition-transform duration-300 has-shadow hover:scale-105"
        >
          <div className="flex justify-center flex-col w-full h-full items-center">
            <img
              width="80"
              height="80"
              src="/images/filiere.png"
              alt="filiere"
            />
            <h3 className="text-xl ms-2 font-semibold">Filieres</h3>
          </div>
        </a>
        <a
          href="/students-by-filiere"
          className=" border border-blue-500 overflow-hidden rounded-lg has-shadow py-4 flex flex-col gap-2 col-span-12 md:col-span-6 lg:col-span-3 hover:cursor-pointer transform transition-transform duration-300 has-shadow hover:scale-105"
        >
          <div className="flex justify-center flex-col w-full h-full items-center">
            <img
              width="80"
              height="80"
              src="/images/student-by-filiere.png"
              alt="student-by-filiere"
            />
            <h3 className="text-xl ms-2 font-semibold">Student by filiere</h3>
          </div>
        </a>
        <a
          href="/role-assignment"
          className=" border border-blue-500 overflow-hidden rounded-lg has-shadow py-4 flex flex-col gap-2 col-span-12 md:col-span-6 lg:col-span-3 hover:cursor-pointer transform transition-transform duration-300 has-shadow hover:scale-105"
        >
          <div className="flex justify-center flex-col w-full h-full items-center">
            <img
              width="80"
              height="80"
              src="/images/assignment.png"
              alt="assignment"
            />
            <h3 className="text-xl ms-2 font-semibold">Role Sssignment</h3>
          </div>
        </a> */
}
