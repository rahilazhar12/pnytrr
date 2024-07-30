'use client';
import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import axios from 'axios';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    padding: "2px",
    width: "950px"
  },
  overlay: {
    backgroundColor: 'rgba(0,0,0,0.75)',
  },
};

const Galleryclient = ({ params }) => {
  const { id } = params;
  const [relatedImages, setRelatedImages] = useState([]);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");

  const openModal = (imageSrc) => {
    setIsOpen(true);
    setSelectedImage(imageSrc);
  }

  const closeModal = () => {
    setIsOpen(false);
    setSelectedImage("");
  }

  useEffect(() => {
    axios.get(`https://www.admin777.pny-trainings.com/api/gallery/${id}`)
      .then(response => {
        const imagesArray = Array.isArray(response.data.galleries.images)
          ? response.data.galleries.images
          : []; // Adjusted to handle null/undefined cases
        setRelatedImages(imagesArray);
      })
      .catch(error => {
        console.error(error);
        setRelatedImages([]); // Ensure relatedImages is always an array
      });
  }, [id]);

  return (
    <>
      <section>
        <div className=' bg-[#152438] text-white h-[306px] flex flex-col justify-center items-center'>
          <div className=' text-[48px] font-semibold'>Gallery</div>
          <div className=' text-[20px] font-normal'>Check Our memorial Moments</div>
        </div>
      </section>
      <div className='grid grid-cols-3 p-3 gap-2'>
        {relatedImages.map((image, index) => (
          <div
            key={index}
            className="block rounded-lg bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700 p-2 border border-[#308AFF] image-container"
          >
            <a href="#!">
              <img
                className='cursor-pointer border-2 shadow-lg image-fit'
                src={image.image}
                alt=""
                loading='lazy'
                onClick={() => openModal(image.image)}
              />
            </a>
          </div>
        ))}
      </div>
      {modalIsOpen && (
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          style={customStyles}
          contentLabel="Image Modal"
        >
          <img
            src={selectedImage}
            alt="Selected"
            onClick={closeModal}
            style={{ width: '100%', height: 'auto', cursor: 'pointer' }}
            loading='lazy'
          />
        </Modal>
      )}
    </>
  );
}

export default Galleryclient;
