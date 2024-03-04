import { createPortal } from "react-dom";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";

import "./ConfirmModal.scss";
import { RootState } from "../../redux/store";
import { setShowModal } from "../../redux/confirmRequest/confirmRequest";
import { setRequestResponse } from "../../redux/requests/requestSlice";
import { actuallyRemoveChallenge } from "../../redux/props/picksSlice";
import { useFetchChallengesByUserQuery } from "../../redux/props/propsApi";
import { ImSpinner2 } from "react-icons/im";
import { handleShowRequestModal } from "../utils";

export default function ConfirmModal() {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user.user);
  const { refetch } = useFetchChallengesByUserQuery(user?._id!);
  const {
    message: responseMessage,
    showModal,
    itemId,
    propId,
  } = useSelector((state: RootState) => state.confirmRequestSlice);
  const [loading, setLoading] = useState<boolean>(false);

  async function handleConfirmed() {
    setLoading(true);

    const res = await fetch(`/api/props/delete-challenge/${itemId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();

    if (!data) {
      setLoading(false);
      throw new Error("Something went wrong");
    }

    dispatch(
      setShowModal({
        modalAction: "hide",
        message: "",
        propId: "",
        itemId: "",
      }),
    );

    // dispatch to SHOW request card
    handleShowRequestModal(dispatch, data);

    setLoading(false);

    // NEED TO ALSO REMOVE FROM STATE!! (Hopefull you can remove this soon)
    refetch();
    dispatch(
      actuallyRemoveChallenge({
        challengeId: itemId,
        propId: propId,
      }),
    );
  }

  const children = (
    <div className={`proposal-modal-wrapper modal`}>
      <div className="modal-content">
        <div className="text-black">{responseMessage}</div>
        <div className="flex w-full gap-2 overflow-hidden">
          <button
            onClick={handleConfirmed}
            className="w-full rounded-sm bg-green-700 p-2 transition-all duration-200 active:opacity-90"
          >
            {loading ? (
              <span
                className={
                  "flex animate-spin items-center justify-center text-black"
                }
              >
                <ImSpinner2 />
              </span>
            ) : (
              <span>Yes</span>
            )}
          </button>
          <button
            onClick={() =>
              dispatch(
                setShowModal({
                  modalAction: "hide",
                  message: "",
                  propId: "",
                  itemId: "",
                }),
              )
            }
            className="w-full rounded-sm bg-red-700 p-2 transition-all duration-200 active:opacity-90"
          >
            No
          </button>
        </div>
      </div>
      <div
        onClick={() =>
          dispatch(
            setShowModal({
              modalAction: "hide",
              message: "",
              itemId: "",
              propId: "",
            }),
          )
        }
        className="modal-background"
      ></div>
    </div>
  );

  const portalRoot = document.getElementById("modal-container")!;

  return showModal && createPortal(children, portalRoot);
}
