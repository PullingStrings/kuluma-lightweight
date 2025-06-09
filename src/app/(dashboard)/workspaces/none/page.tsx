"use client"

export default function NoWorkspaces() {
  return (
    <div className='p-6'>
      <h2 className='text-xl font-semibold mb-2'>No workspaces yet</h2>
      <p className='text-sm text-muted-foreground'>
        You’re not a member of any workspace. Ask an admin for an invite
        or&nbsp;
        <button className='underline'>create a new workspace</button>.
      </p>
    </div>
  )
}
