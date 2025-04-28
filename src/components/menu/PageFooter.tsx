
export function PageFooter() {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-bold mb-4">DineFlow Restaurant</h3>
            <p className="text-gray-300">
              Serving quality food since 2020
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-4">Contact</h3>
            <address className="not-italic text-gray-300">
              <p>123 Restaurant Street</p>
              <p>Foodie City, FC 12345</p>
              <p className="mt-2">Phone: (123) 456-7890</p>
              <p>Email: info@dineflow.com</p>
            </address>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-4">Hours</h3>
            <p className="text-gray-300">
              Monday - Friday: 11am - 10pm<br />
              Saturday - Sunday: 10am - 11pm
            </p>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-gray-700 text-center text-gray-400">
          <p>&copy; 2025 DineFlow Restaurant. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
