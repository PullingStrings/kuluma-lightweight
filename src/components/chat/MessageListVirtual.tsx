"use client"
import { FixedSizeList as List, ListChildComponentProps } from "react-window"
import AutoSizer from "react-virtualized-auto-sizer"
import { useEffect, useRef } from "react"
import MessageItem, { ApiMessage } from "./MessageItem"

interface Props {
  messages: ApiMessage[]
  loading: boolean
}

export default function MessageListVirtual({ messages, loading }: Props) {
  const ROW = 100 // estimated height
  const listRef = useRef<List>(null)
  useEffect(() => {
    // scroll to bottom on new msg
    if (messages.length) listRef.current?.scrollToItem(messages.length - 1)
  }, [messages.length])

  const Row = ({ index, style }: ListChildComponentProps) => (
    <div style={style}>
      <MessageItem msg={messages[index]} />
    </div>
  )

  return (
    <div className='flex-1 overflow-hidden'>
      {loading ? (
        <p className='p-4'>Loading…</p>
      ) : (
        <AutoSizer>
          {({ height, width }) => (
            <List
              ref={listRef}
              height={height}
              width={width}
              itemCount={messages.length}
              itemSize={ROW}
              overscanCount={10}
            >
              {Row}
            </List>
          )}
        </AutoSizer>
      )}
    </div>
  )
}
