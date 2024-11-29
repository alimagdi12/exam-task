/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Announcement, AnnouncementContextType } from "../../modals/modals";

const AnnouncementContext = createContext<AnnouncementContextType | undefined>(
  undefined
);

export const AnnouncementProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchAnnouncements = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(
        "https://blog2-uj54.onrender.com/api/announcement"
      );
      setAnnouncements(response.data.data);
    } catch (error) {
      setError("Error fetching announcements.");
    } finally {
      setLoading(false);
    }
  };

  const addAnnouncement = async (
    announcement: Omit<Announcement, "_id" | "createdAt">
  ) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post(
        "https://blog2-uj54.onrender.com/api/announcement",
        announcement
      );
      setAnnouncements((prev) => [...prev, response.data.data]);
      toast.success("Announcement Added Successfully...");
    } catch (error) {
      setError("Error adding announcement.");
    } finally {
      setLoading(false);
    }
  };

  const updateAnnouncement = async (
    id: string,
    updatedAnnouncement: Omit<Announcement, "_id" | "createdAt">
  ) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.patch(
        `https://blog2-uj54.onrender.com/api/announcement/${id}`,
        updatedAnnouncement
      );
      setAnnouncements((prev) =>
        prev.map((announcement) =>
          announcement._id === id ? response.data.data : announcement
        )
      );
      toast.info("Announcement updated successfully...");
    } catch (error) {
      setError("Error updating announcement.");
    } finally {
      setLoading(false);
    }
  };

  const deleteAnnouncement = async (id: string) => {
    setLoading(true);
    setError(null);
    try {
      await axios.delete(`https://blog2-uj54.onrender.com/api/announcement/${id}`);
      setAnnouncements((prev) =>
        prev.filter((announcement) => announcement._id !== id)
      );
      toast.error("Announcement deleted successfully...");
    } catch (error) {
      setError("Error deleting announcement.");
    } finally {
      setLoading(false);
    }
  };

  const deleteAllAnnouncements = async () => {
    setLoading(true);
    setError(null);
    try {
      await axios.delete("https://blog2-uj54.onrender.com/api/announcement");
      setAnnouncements([]);
    } catch (error) {
      setError("Error deleting all announcements.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAnnouncements();
  }, []);

  return (
    <AnnouncementContext.Provider
      value={{
        announcements,
        loading,
        error,
        fetchAnnouncements,
        addAnnouncement,
        updateAnnouncement,
        deleteAnnouncement,
        deleteAllAnnouncements,
      }}
    >
      {children}
    </AnnouncementContext.Provider>
  );
};

export const useAnnouncementContext = () => {
  const context = useContext(AnnouncementContext);
  if (!context) {
    throw new Error(
      "useAnnouncementContext must be used within an AnnouncementProvider"
    );
  }
  return context;
};
// export { Announcement };
