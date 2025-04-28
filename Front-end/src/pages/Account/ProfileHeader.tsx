interface ProfileHeaderProps {
  name: string;
  mail: string;
}

const ProfileHeader = ({name, mail}: ProfileHeaderProps) => {
  return (
    <>
      <div className="flex flex-col items-center justify-center relative min-h-[350px] w-full max-w-[1232px] text-sm text-[#121] font-medium mx-auto mt-12 pt-[276px] pb-[26px] px-20 rounded-xl max-md:mt-10 max-md:pt-[100px] max-md:px-5 ">
        <img
          src="https://images.unsplash.com/photo-1742943892627-f7e4ddf91224?q=80&w=2669&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Profile cover"
          className="absolute h-full w-full object-cover inset-0 rounded-xl"
        />
        <button
          className="absolute bottom-4 right-4 justify-center items-center rounded flex min-h-12 gap-1 p-4 z-100 bg-[#8DB1D3] text-[#112211] transition duration-500 hover:bg-[#6c9bc7] hover:text-[#112211] cursor-pointer"
          aria-label="Upload new cover"
        >
          <img
            src="https://cdn.builder.io/api/v1/image/assets/8671db91b3d64fe09e949cebc9364f9c/adf04932b31e297780027b9c88810f76869c53ac?placeholderIfAbsent=true"
            alt="Upload icon"
            className="aspect-[1] object-contain w-4 self-stretch shrink-0 my-auto"
          />
          <span className="self-stretch my-auto">Upload new cover</span>
        </button>
      </div>
      <div className="flex justify-center items-center w-full z-10 mt-[-70px]">
        <div className="w-full max-w-[1232px] flex justify-center">
          <div className="relative flex flex-col items-center justify-center">
            <img
              src="https://cdn.builder.io/api/v1/image/assets/8671db91b3d64fe09e949cebc9364f9c/ac8cbeb6288fb2110cc2ed9f73783c911a9e1450?placeholderIfAbsent=true"
              alt="Profile avatar"
              className="aspect-[1] object-contain w-40 shadow-[0px_4px_16px_0px_rgba(0,0,0,0.08)] z-0 max-w-full rounded-[50%]"
            />
            <div className="self-stretch z-0 flex w-full flex-col text-[#121] text-center mt-6">
              <h2 className="text-2xl font-semibold">{name}</h2>
              <p className="text-base font-normal opacity-75 mt-2">
                {mail}
              </p>
            </div>
            <button
              className="bg-[#FF8682] absolute z-0 flex w-11 gap-2.5 h-11 p-2.5 rounded-[45px] right-[25px] bottom-[81px] cursor-pointer transition duration-500 hover:bg-[#FF4F3D] hover:text-[#112211] text-[#112211] items-center justify-center"
              aria-label="Edit profile"
            >
              <img
                src="https://cdn.builder.io/api/v1/image/assets/8671db91b3d64fe09e949cebc9364f9c/bf07275ab07b31a3f641ea98fb81524351173657?placeholderIfAbsent=true"
                alt="Edit icon"
                className="aspect-[1] object-contain w-6"
              />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfileHeader;
