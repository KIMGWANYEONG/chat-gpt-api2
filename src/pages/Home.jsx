import axios from "axios";
import { useEffect, useState } from "react";
import { FiSearch } from "react-icons/fi";

const Home = () => {
  const [content, setContent] = useState("");
  const [chatlist, setChatlist] = useState();

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

      setChatlist({
        question: content,
        answer: response.data.choices[0].message.content,
      });
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    console.log(chatlist);
  }, [chatlist]);

  return (
    <div className="mt-8 flex flex-col items-center">
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
      <ul className="mt-8 px-4 flex flex-col gap-4">
        <li className="bg-pink-50 p-4 rounded-md text-lg shadow-md shadow-pink-50">
          <div className="mb-2 font-semibold">Q. {chatlist?.question}</div>
          <div>A. {chatlist?.answer}</div>
        </li>
      </ul>
    </div>
  );
};

export default Home;
