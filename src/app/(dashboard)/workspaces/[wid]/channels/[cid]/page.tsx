"use client"
import { useParams } from "next/navigation"
import { useQuery } from "@tanstack/react-query"
import api from "@/lib/api"
// import MessageList from "@/components/chat/MessageList"
import MessageListVirtual from "@/components/chat/MessageListVirtual"
import MessageComposer from "@/components/chat/MessageComposer"
import TypingIndicator from "@/components/presence/TypingIndicator"

export default function ChannelPage() {
  const { cid } = useParams() as { cid: string }
  const { data, isLoading } = useQuery({
    queryKey: ["messages", cid],
    queryFn: () =>
      api.get(`/api/channels/${cid}/messages`).then((r) => r.data.messages),
  })

  return (
    <section className='flex flex-col h-full'>
      <MessageListVirtual messages={data ?? []} loading={isLoading} />
      <TypingIndicator />
      <MessageComposer channelId={cid} />
    </section>
  )
}
