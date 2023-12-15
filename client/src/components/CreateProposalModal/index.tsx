import { createPortal } from "react-dom"
import { useSelector } from "react-redux"
import { useState } from "react"

import { RootState } from "../../redux/store"
import "./CreateProposalModal.scss"

interface CreateProposalModalProps {
  closeModal: () => void
  refetch: () => void
}

export default function CreateProposalModal({
  closeModal,
  refetch
}: CreateProposalModalProps) {
  // NEED TO ADD LOADING AND STUFF ALSO
  const { user } = useSelector((state: RootState) => state.user)
  const [formData, setFormData] = useState({ title: "", content: "" })
  const [error, setError] = useState<boolean | string>(false)

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    })
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()

    if (formData.content.length < 10) {
      setError("Please write a long description")
      return
    }

    try {
      const res = await fetch("/api/posts/proposals", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      })

      const data = await res.json()

      if (data.success === false) {
        setError(data.message)
        return
      }

      closeModal()
      refetch()
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message)
      } else {
        console.log(error)
      }
    }
  }

  const children = (
    <div
      className={`submit-proposal-modal-wrapper modal ${
        user && user?.preferredTheme
      }`}
    >
      <div className="modal-content">
        <div className="modal-header">
          <div className="modal-icon">
            <img src="/proposalsDark.png" alt="img" />
          </div>
          <div className="modal-header-text">
            <h2>Add Proposal</h2>
            <p>Fill out the form below and pray KJD is in a good mood.</p>
          </div>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="input-wrapper">
            <label htmlFor="title">Topic</label>
            <input
              onChange={handleChange}
              type="text"
              name="title"
              id="title"
              placeholder="Down with KJD"
              maxLength={35}
              minLength={5}
              value={formData.title}
              required
            />
          </div>
          <div className="input-wrapper">
            <label htmlFor="content">Description</label>
            <textarea
              onChange={handleChange}
              maxLength={350}
              name="content"
              id="content"
              placeholder="KJD has too much power and it is the best interest of the league to overthrow him. Yesterday, I saw him drink a bud light so I now know that he is weak and probably gay. We already have a gay guy in this league (Dan). We don't need another."
              rows={6}
              value={formData.content}
              required
            />
          </div>
          <button type="submit" className="submit-proposal">
            SUBMIT PROPOSAL
          </button>
        </form>
        {error && <div>{error}</div>}
      </div>
      <div onClick={closeModal} className="modal-background"></div>
    </div>
  )
  const portalRoot = document.getElementById("modal-container")!

  return createPortal(children, portalRoot)
}
