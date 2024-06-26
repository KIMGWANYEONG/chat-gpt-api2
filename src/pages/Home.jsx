import axios from "axios";
import { useState } from "react";
import { FiSearch } from "react-icons/fi";
import ChatlistCard from "../components/ChatlistCard";
import { CgOpenCollective } from "react-icons/cg";

const Home = () => {
  const [content, setContent] = useState("");
  const [chatlist, setChatlist] = useState([]);
  const [isLoading, setLoading] = useState(false);

  const onSubmitChat = async (e) => {
    try {
      e.preventDefault();

      if (!content) return;

      setLoading(true);

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

      const newChat = {
        question: content,
        answer: response.data.choices[0].message.content,
      };

      let savedChatlist = localStorage.getItem("savedChatlist");

      if (!savedChatlist) {
        savedChatlist = [];
      } else {
        savedChatlist = JSON.parse(savedChatlist);
      }

      savedChatlist.push(newChat);

      localStorage.setItem("savedChatlist", JSON.stringify(savedChatlist));

      setChatlist([newChat, ...chatlist]);

      setLoading(false);
    } catch (error) {
      console.error(error);

      setLoading(false);
    }
  };

  return (
    <div className="mt-10 mb-10 max-h-screen flex flex-col items-center">
      <form className="flex" onSubmit={onSubmitChat}>
        <input
          className="mt-6 text-2xl p-2 focus:outline-none rounded-lg border-2 border-gray-200 focus:border-gray-400"
          type="text"
          value={content}
          disabled={isLoading}
          onChange={(e) => setContent(e.target.value)}
        />
        <button
          className="mt-6 ml-4 flex items-center bg-gray-50 text-2xl px-4 py-[10px] rounded-full shadow-md shadow-gray-200 hover:bg-gray-200"
          type="submit"
          disabled={isLoading}
        >
          {isLoading ? (
            <CgOpenCollective className="mr-2 animate-spin-slow" />
          ) : (
            <FiSearch className="mr-2" />
          )}
          검색
        </button>
      </form>
      <ul className="mt-10 px-10 max-screen-h flex flex-col gap-4">
        {chatlist.map((v, i) => (
          <ChatlistCard key={i} question={v.question} answer={v.answer} />
        ))}
      </ul>
    </div>
  );
};

export default Home;
