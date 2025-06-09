import { FaGithub } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { FaLink } from "react-icons/fa6";
import { FaTwitter } from "react-icons/fa";

export const SocialMediaLink = ({ item, className }) => {
  const { name, url } = item;

  const iconMap = {
    github: <FaGithub />,
    youtube: <FaYoutube />,
    facebook: <FaFacebook />,
    instagram: <FaInstagram />,
    linkedin: <FaLinkedin />,
    twitter: <FaTwitter />,
  };

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
    >
      {iconMap[name.toLowerCase()] || <FaLink />}
    </a>
  );
};

export const SocialMediaLinks = ({ className, classNameItem, items }) => {
  return (
    <div className={className}>
      {items.map((item, index) => (
        <SocialMediaLink key={index} item={item} className={classNameItem} />
      ))}
    </div>
  );
};
