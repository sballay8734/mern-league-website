import { FaCheckCircle } from "react-icons/fa";
import { IoIosCloseCircle } from "react-icons/io";

export interface RequestStatus {
  result: string;
  showStatus: boolean;
  message: string;
}

export default function RequestStatusModal({
  result,
  showStatus,
  message,
}: RequestStatus) {
  return (
    <div
      className={`${showStatus === true ? "show" : ""} statusBar absolute z-[1000] flex h-16 w-full items-center justify-center rounded-md px-2 py-1 text-center text-black ${result === "fail" ? "border-[1px] border-red-500 bg-red-950 text-red-500" : result === "success" ? "border-[1px] border-green-500 bg-green-950 text-green-500" : "border-[1px] border-gray-500 bg-gray-950 text-gray-500"}`}
    >
      <p className="flex items-center gap-2">
        <span className="flex items-center gap-1">
          <span>
            {result === "fail" ? <IoIosCloseCircle /> : <FaCheckCircle />}
          </span>
          {message}
        </span>
      </p>
    </div>
  );
}
