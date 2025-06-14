import { motion } from 'framer-motion';

const Footer = () => {
    return (
        <motion.footer
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="bg-white dark:bg-gray-800 shadow p-4 text-center"
        >
            <p className="text-gray-600 font-poppins dark:text-gray-300">© 2025 My App. All rights reserved.</p>
        </motion.footer>
    );
};

export default Footer;