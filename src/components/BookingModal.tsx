import React, { useState, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";

interface BookingModalProps {
  isOpen: boolean;
  closeModal: () => void;
  doctorId: string;
}

const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  closeModal,
  doctorId,
}) => {
  const [iframeHeight, setIframeHeight] = useState("500px");

  useEffect(() => {
    const handleResize = () => {
      const iframeElement = document.getElementById(
        "booking-iframe"
      ) as HTMLIFrameElement;
      if (iframeElement && iframeElement.contentWindow) {
        const doc = iframeElement.contentWindow.document;
        if (doc.body) {
          setIframeHeight(`${doc.body.scrollHeight}px`);
        }
      }
    };

    const iframeElement = document.getElementById(
      "booking-iframe"
    ) as HTMLIFrameElement;
    if (iframeElement) {
      iframeElement.addEventListener("load", handleResize);
    }

    return () => {
      if (iframeElement) {
        iframeElement.removeEventListener("load", handleResize);
      }
    };
  }, [doctorId]);

  return (
    <Transition appear show={isOpen} as={React.Fragment}>
      <Dialog as="div" className="relative z-50" onClose={closeModal}>
        <Transition.Child
          as={React.Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          <div className="fixed inset-0 bg-black bg-opacity-5" />
        </Transition.Child>
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Transition.Child
            as={React.Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <Dialog.Panel className="w-full max-w-4xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all relative">
              <Dialog.Title
                as="h3"
                className="text-xl font-medium leading-6 text-gray-900"
              >
                Đặt lịch hẹn
              </Dialog.Title>
              <div className="mt-2">
                {/* Hiển thị Booking dưới dạng iframe */}
                <iframe
                  id="booking-iframe"
                  src={`/booking?doctorId=${doctorId}`}
                  className="w-full border-none"
                  style={{ height: iframeHeight }}
                  scrolling="no"
                  title="Booking Form"
                />
              </div>
              {/* Close button in top-right corner */}
              <button
                onClick={closeModal}
                className="absolute top-2 right-6 text-4xl text-gray-500 hover:text-gray-800"
                aria-label="Close"
              >
                &times;
              </button>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
};

export default BookingModal;
