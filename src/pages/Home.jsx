import axios from "axios";
import { useState } from "react";
import { FiSearch } from "react-icons/fi";

const Home = () => {
  const [content, setContent] = useState("");

  const onSubmitChat = async (e) => {
    try {
      e.preventDefault();

      if (!content) return;

      const response = await axios.post(
        "https://api.openai.com/v1/chat/completions",
        {
          model: "gpt-3.5-turbo",
          messages: [
            {
              role: "user",
              content,
            },
          ],
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`,
          },
        }
      );

      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="mt-8 flex justify-center">
      <form className="flex" onSubmit={onSubmitChat}>
        <input
          className="text-2xl p-2 focus:outline-none rounded-lg border-2 border-pink-200 focus:border-pink-400"
          type="text"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <button
          className="ml-4 flex items-center bg-pink-400 text-2xl px-4 py-[10px] rounded-full shadow-md shadow-pink-200 hover:bg-pink-500"
          type="submit"
        >
          <FiSearch className="mr-2" />
          검색
        </button>
      </form>
    </div>
  );
};

export default Home;
