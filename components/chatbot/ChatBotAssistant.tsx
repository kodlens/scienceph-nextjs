import React from 'react'

const ChatBotAssistant = () => {
  return (
    <details className="group fixed bottom-6 right-6 z-50">
        <summary className="flex h-14 w-14 cursor-pointer list-none items-center justify-center rounded-full bg-sky-600 text-xl text-white shadow-lg transition hover:bg-sky-700 [&::-webkit-details-marker]:hidden">
          💬
        </summary>

        <div className="absolute bottom-16 right-0 w-[320px] overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl">
          <div className="border-b border-slate-200 bg-slate-50 px-4 py-3">
            <h3 className="text-sm font-semibold text-slate-800">Chat Assistant</h3>
            <p className="text-xs text-slate-500">Prototype UI for your upcoming ChatBot</p>
          </div>

          <div className="h-72 space-y-3 overflow-y-auto p-4 text-sm">
            <div className="max-w-[85%] rounded-2xl rounded-bl-sm bg-slate-100 px-3 py-2 text-slate-700">
              Hi! How can I help you today?
            </div>
            <div className="ml-auto max-w-[85%] rounded-2xl rounded-br-sm bg-sky-600 px-3 py-2 text-white">
              I want to find the latest science resources.
            </div>
            <div className="max-w-[85%] rounded-2xl rounded-bl-sm bg-slate-100 px-3 py-2 text-slate-700">
              Great. I can help with articles, categories, and office contacts.
            </div>
          </div>

          <div className="border-t border-slate-200 p-3">
            <form className="flex items-center gap-2">
              <input
                type="text"
                placeholder="Type your message..."
                className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-sky-500"
              />
              <button
                type="button"
                className="rounded-lg bg-sky-600 px-3 py-2 text-sm font-medium text-white transition hover:bg-sky-700"
              >
                Send
              </button>
            </form>
          </div>
        </div>
      </details>
  )
}

export default ChatBotAssistant