// Define the type for the props of the FormHeader component, specifying that it will receive a 'title' and 'description' as strings.
interface FormHeaderProps {
    title: string;
    description: string;
  }
  
  // FormHeader component - renders a header with a title and a description.
  export const FormHeader: React.FC<FormHeaderProps> = ({
    title,
    description,
  }) => (
    <header className="flex flex-col gap-4 items-start w-full">
      <h1 className="text-4xl text-black max-md:text-3xl max-sm:text-3xl">
        {title}
      </h1>
      <p className="text-base opacity-75 text-neutral-900">{description}</p>
    </header>
  );
  