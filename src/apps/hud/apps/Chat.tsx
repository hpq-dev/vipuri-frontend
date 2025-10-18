import {
  formatMessage,
  sanitizeUserMessage,
} from "@/apps/hud/libs/FormatMessage";
import { AnimatePresence, motion } from "framer-motion";
import { useRef, useEffect, useCallback, useMemo } from "react";
import { useHudStore } from "@/stores/apps";
import { SendIcon } from "@/utils/icons/hud";
import clsx from "clsx";
import { isGameEnv } from "@/utils/helpers"; 
 

const MAX_HISTORY = 15;

export const Chat = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const endRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const { chat, registerApp, unregisterApp, stateApps } = useHudStore();
  const {
    toggleBarStatus,
    addMessage,
    clearMessages,
    barStatus,
    category,
    categories,
    message,
    tempMessage,
    history,
    historyIndex,
    setHistory,
    setHistoryIndex,
    setTempMessage,
    setMessage,
    setCategory,
  } = chat;

  const scrollToBottom = useCallback(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight });
  }, []);

  const recentHistory = useMemo(() => history.slice(-MAX_HISTORY), [history]);

  const closeChat = useCallback(() => {
    if (!isGameEnv()) return;
    toggleBarStatus(false);
    setHistoryIndex(null);
    setTempMessage("");
    setMessage(""); 
  }, [toggleBarStatus, setHistoryIndex, setTempMessage, setMessage]);

  const send = useCallback(() => {
    if (!message.trim()) return closeChat();
    const sanitized = sanitizeUserMessage(message.trim());

    if (isGameEnv()) {
     
    } else {
      addMessage({ message: sanitized, category });
    }

    setHistory([...history, sanitized].slice(-MAX_HISTORY));
    closeChat();
  }, [message, closeChat, category, addMessage, setHistory, history]);

  const handleKey = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        send();
      }
      if (e.key === "Escape") closeChat();
      if (e.key === "ArrowUp" || e.key === "ArrowDown") {
        e.preventDefault();
        const dir = e.key === "ArrowUp" ? -1 : 1;

        let nextIdx: number | null =
          historyIndex === null
            ? dir === -1
              ? recentHistory.length - 1
              : -1
            : historyIndex + dir;

        if (nextIdx < 0 || nextIdx >= recentHistory.length) {
          nextIdx = null;
        }

        if (historyIndex === null && dir === -1) setTempMessage(message);
        setHistoryIndex(nextIdx);
        setMessage(nextIdx === null ? tempMessage : recentHistory[nextIdx]);
      }
    },
    [
      send,
      closeChat,
      message,
      historyIndex,
      recentHistory,
      tempMessage,
      setHistoryIndex,
      setMessage,
      setTempMessage,
    ]
  );

  useEffect(() => {
    if (barStatus) {
      inputRef.current?.focus();
      scrollToBottom();
    }
  }, [barStatus, scrollToBottom]);

  useEffect(() => {
    setTimeout(scrollToBottom, 50);
  }, [chat.messages, scrollToBottom]);

  useEffect(() => {
    if (!isGameEnv()) return;
    registerApp?.("Chat");
    return () => unregisterApp?.("Chat");
  }, [registerApp, unregisterApp]);

  useEffect(() => {
    if (!isGameEnv()) return;
     
  }, [addMessage, clearMessages, toggleBarStatus, scrollToBottom]);

  const filtered = chat.messages.filter(
    ({ category: c }) =>
      category === categories[0]?.name ||
      c.toLowerCase() === category.toLowerCase()
  );

  return stateApps.Chat ? (
    <div className="absolute left-[1.3vw] top-[3vh] z-20 select-none">
      <div className="flex w-[27vw] max-w-[27vw] flex-col items-start">
        <div
          ref={scrollRef}
          className={clsx(
            "flex h-[26.5vh] w-full flex-col overflow-x-hidden items-start justify-start gap-[5vh] scroll-smooth [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-primary [&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-track]:bg-primary/10 [&::-webkit-scrollbar]:w-[0.3vw]",
            !barStatus ? "overflow-y-hidden" : "overflow-y-auto"
          )}
          style={{ direction: "rtl" }}
        >
          <div
            style={{ direction: "ltr" }}
            className="flex w-full flex-col gap-[1vh]"
          >
            <AnimatePresence initial={false}>
              {filtered.map(({ message }, i) => (
                <motion.p
                  key={i}
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.5 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  className="whitespace-pre-wrap text-shadow-xs break-all text-[0.7vw] font-bold tracking-wide text-light"
                >
                  {formatMessage(message)}
                </motion.p>
              ))}
            </AnimatePresence>
            <div ref={endRef} />
          </div>
        </div>

        {barStatus && (
          <motion.div
            initial={{ opacity: 0, scale: 0.75 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.75 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="flex w-full flex-col gap-[1vh]"
          >
            <div className="relative flex w-full">
              <input
                ref={inputRef}
                type="text"
                value={message}
                onChange={(e) => {
                  setMessage(e.target.value);
                  setHistoryIndex(null);
                }}
                onKeyDown={handleKey}
                autoFocus
                placeholder="Type messages"
                className="w-full rounded-[1vh] bg-dark-300 py-[1.2vh] pl-[0.8vw] pr-[2.5vw] text-[0.55vw] tracking-wide text-light/70 placeholder:text-light/70"
              />
              <motion.div
                whileTap={{ scale: 0.5 }}
                onClick={send}
                className="absolute right-[0.3vw] top-[50%] -translate-y-[50%] flex h-[3vh] w-[1.5vw] cursor-pointer items-center justify-center rounded-[0.8vh] bg-primary/10 transition hover:bg-primary/30"
              >
                <SendIcon className="w-[0.7vw] text-primary" />
              </motion.div>
            </div>

            <div className="flex gap-[0.5vw]">
              {categories.map(({ id, name }) => (
                <motion.div
                  key={id}
                  whileTap={{ scale: 0.2 }}
                  onClick={() => setCategory(name)}
                  className={clsx(
                    "cursor-pointer rounded-[0.7vh] px-[0.6vw] py-[0.3vh] transition",
                    category === name
                      ? "bg-primary text-black"
                      : "bg-primary/40 text-primary hover:bg-primary/60"
                  )}
                >
                  <span className="text-[0.55vw] font-extrabold uppercase">
                    {name}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  ) : null;
};
