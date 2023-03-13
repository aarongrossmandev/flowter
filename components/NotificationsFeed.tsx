import useCurrentUser from "@/hooks/useCurrentUser"
import useNotifications from "@/hooks/useNotifications";
import { useEffect } from "react";
import { GiStaticWaves } from "react-icons/gi";

const NotificationsFeed = () => {
  const { data: currentUser, mutate: mutateCurrentUser } = useCurrentUser();
  const { data: fetchedNotifications = [] } = useNotifications(currentUser?.id);

  useEffect(() => {
    mutateCurrentUser();
  }, [mutateCurrentUser]);

  if (fetchedNotifications.length === 0) {
    return (
      <div className="text-neutral-600 text-center p-6 text-xl">
        No new notifications
      </div>
    )
  }
  return (
    <div className="flex flex-col">
      {fetchedNotifications.map((noti: Record<string, any>) => (
        <div
          key={noti.id}
          className="flex flex-row items-center p-6 gap-4 border-b border-neutral-800"
        >
          <GiStaticWaves size={32} />
          <p>
            {noti.body}
          </p>
        </div>
      ))}
    </div>
  )
}

export default NotificationsFeed