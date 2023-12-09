import { IF } from "../url"

const ProfilePosts = ({p}) => {
    return (
        <div className="w-full flex mt-8 space-x-4 transition duration-300 ease-in-out hover:scale-105">
      <div className="w-[35%] h-[200px] flex justify-center items-center">
      <img src={IF+p.photo} alt="" className="scale-125 mt-40 mr-20 object-cover rounded-xl" />
      </div>
      <div className="flex flex-col w-[65%]">
        <h1 className="text-xl font-bold md:mb-2 mb-1 md:text-2xl">
          {p.title}
        </h1>
        <div className="flex mb-2 text-sm font-semibold text-gray-500 items-center justify-between md:mb-4">
          <p>@{p.username}</p>
          <div className="flex space-x-2">
            <p>{new Date(p.updatedAt).toString().slice(0,15)}</p>
            <p>{new Date(p.updatedAt).toString().slice(16,21)}</p>
          </div>
        </div>
        <p className="text-sm md:text-lg">{p.desc}</p>
      </div>

      </div>
    )   
}

export default ProfilePosts