import { useState } from "react";
import AccountButton from "./AccountButton";
import jsdate from "dayjs";

// Define the types for user data
interface UserData {
  name: string;
  email: string;
  password: string;
  phone: string;
  address: string;
  dob: string;
}

// Define the AccountDetails component that displays and allows editing of user information
const AccountDetails = ({name, email, password, phone, address, dob}: UserData) => {
  const [userData] = useState<UserData>({
    name: name,
    email: email,
    password: password,
    phone: phone,
    address: address,
    dob: dob,
  });
  const date = jsdate(dob).format("DD-MM-YYYY");

  const handleChange = (field: keyof UserData) => {
    console.log(`Changing ${field}`);
  };

  const handleAddEmail = () => {
    console.log("Adding another email");
  };

  return (
    <section className="w-full max-w-[1232px] mx-auto my-10">
      <h1 className="text-black text-[32px] font-normal">Account</h1>
      <div className="shadow-[0px_4px_16px_0px_rgba(17,34,17,0.05)] bg-white w-full text-[#121] mt-4 px-6 py-8 rounded-2xl max-md:max-w-full max-md:px-5">
       
        <div className="flex w-full items-center gap-[40px_100px] justify-between flex-wrap max-md:max-w-full">
          <div className="self-stretch my-auto">
            <label className="text-base font-normal opacity-75 block">
              Name
            </label>
            <div className="text-xl font-semibold mt-2">{userData.name}</div>
          </div>
          <div className="self-stretch text-sm font-medium whitespace-nowrap w-[140px] my-auto">
            <AccountButton
              icon="https://cdn.builder.io/api/v1/image/assets/8671db91b3d64fe09e949cebc9364f9c/28dd1a628df48dae0baf4a96e97b07fbc6b4f118?placeholderIfAbsent=true"
              label="Change"
              onClick={() => handleChange("name")}
            />
          </div>
        </div>

      
        <div className="flex w-full items-center gap-[40px_100px] justify-between flex-wrap mt-8 max-md:max-w-full">
          <div className="self-stretch whitespace-nowrap my-auto">
            <label className="text-base font-normal opacity-75 block">
              Email
            </label>
            <div className="text-xl font-semibold mt-2">{userData.email}</div>
          </div>
          <div className="self-stretch flex min-w-60 gap-2 text-sm font-medium my-auto">
            <div className="w-[185px]">
              <AccountButton
                icon="https://cdn.builder.io/api/v1/image/assets/8671db91b3d64fe09e949cebc9364f9c/794256c2c20347290ad3fe493cb22033e683accd?placeholderIfAbsent=true"
                label="Add another email"
                onClick={handleAddEmail}
              />
            </div>
            <div className="whitespace-nowrap w-[140px]">
              <AccountButton
                icon="https://cdn.builder.io/api/v1/image/assets/8671db91b3d64fe09e949cebc9364f9c/28dd1a628df48dae0baf4a96e97b07fbc6b4f118?placeholderIfAbsent=true"
                label="Change"
                onClick={() => handleChange("email")}
              />
            </div>
          </div>
        </div>
        <div className="flex w-full items-center gap-[40px_100px] whitespace-nowrap justify-between flex-wrap mt-8 max-md:max-w-full">
          <div className="self-stretch my-auto">
            <label className="text-base font-normal opacity-75 block">
              Password
            </label>
            <div className="text-xl font-semibold mt-2">
              {userData.password ? '*'.repeat(userData.password.length) : ''}
            </div>
          </div>
          <div className="self-stretch text-sm font-medium w-[140px] my-auto">
            <AccountButton
              icon="https://cdn.builder.io/api/v1/image/assets/8671db91b3d64fe09e949cebc9364f9c/28dd1a628df48dae0baf4a96e97b07fbc6b4f118?placeholderIfAbsent=true"
              label="Change"
              onClick={() => handleChange("password")}
            />
          </div>
        </div>

        {/* Phone Number Field */}
        <div className="flex w-full items-center gap-[40px_100px] justify-between flex-wrap mt-8 max-md:max-w-full">
          <div className="self-stretch my-auto">
            <label className="text-base font-normal opacity-75 block">
              Phone number
            </label>
            <div className="text-xl font-semibold mt-2">{userData.phone}</div>
          </div>
          <div className="self-stretch text-sm font-medium whitespace-nowrap w-[140px] my-auto">
            <AccountButton
              icon="https://cdn.builder.io/api/v1/image/assets/8671db91b3d64fe09e949cebc9364f9c/28dd1a628df48dae0baf4a96e97b07fbc6b4f118?placeholderIfAbsent=true"
              label="Change"
              onClick={() => handleChange("phone")}
            />
          </div>
        </div>

        
        <div className="flex w-full items-center gap-[40px_100px] justify-between flex-wrap mt-8 max-md:max-w-full">
          <div className="self-stretch min-w-60 my-auto max-md:max-w-full">
            <label className="text-base font-normal opacity-75 block">
              Address
            </label>
            <div className="text-xl font-semibold mt-2 max-md:max-w-full">
              {userData.address}
            </div>
          </div>
          <div className="self-stretch text-sm font-medium whitespace-nowrap w-[140px] my-auto">
            <AccountButton
              icon="https://cdn.builder.io/api/v1/image/assets/8671db91b3d64fe09e949cebc9364f9c/28dd1a628df48dae0baf4a96e97b07fbc6b4f118?placeholderIfAbsent=true"
              label="Change"
              onClick={() => handleChange("address")}
            />
          </div>
        </div>

      
        <div className="flex w-full items-center gap-[40px_100px] justify-between flex-wrap mt-8 max-md:max-w-full">
          <div className="self-stretch my-auto">
            <label className="text-base font-normal opacity-75 block">
              Date of birth
            </label>
            <div className="text-xl font-semibold mt-2">{date}</div>
          </div>
          <div className="self-stretch text-sm font-medium whitespace-nowrap w-[140px] my-auto">
            <AccountButton
              icon="https://cdn.builder.io/api/v1/image/assets/8671db91b3d64fe09e949cebc9364f9c/28dd1a628df48dae0baf4a96e97b07fbc6b4f118?placeholderIfAbsent=true"
              label="Change"
              onClick={() => handleChange("dob")}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AccountDetails;
