import { FaGithub } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { FaLink } from "react-icons/fa6";
import { FaTwitter } from "react-icons/fa";

export const SocialMediaLink = ({ item, className }) => {
  const { name, url } = item;
  console.log(item);
  const iconMap = {
    github: <FaGithub className={className} />,
    youtube: <FaYoutube className={className} />,
    facebook: <FaFacebook className={className} />,
    instagram: <FaInstagram className={className} />,
    linkedin: <FaLinkedin className={className} />,
    twitter: <FaTwitter className={className} />,
  };

  return (
    <a href={url} target="_blank" rel="noopener noreferrer">
      {iconMap[name.toLowerCase()] || <FaLink className={className} />}
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
