import { Link } from 'react-router-dom';
import { ArrowRight, Star, Clock, Users } from 'lucide-react';

const HomePage = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-lemon-primary to-lemon-dark text-white py-20">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="md:w-1/2 mb-10 md:mb-0 animate-fade-in">
              <h1 className="text-4xl md:text-5xl font-bold mb-4 font-heading">
                Little Lemon Restaurant
              </h1>
              <h2 className="text-xl md:text-2xl mb-6 text-lemon-secondary font-medium">
                A Mediterranean Restaurant in Chicago
              </h2>
              <p className="text-lg mb-8 max-w-lg">
                We are a family owned Mediterranean restaurant, focused on traditional recipes served with a modern twist.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to="/booking" className="btn btn-secondary text-lemon-dark flex items-center gap-2">
                  Reserve a Table <ArrowRight className="w-4 h-4" />
                </Link>
                <Link to="/menu" className="btn btn-outline border-white text-white hover:bg-white hover:text-lemon-primary">
                  Explore Menu
                </Link>
              </div>
            </div>
            <div className="md:w-1/2 relative animate-slide-up">
              <img 
                src="https://images.pexels.com/photos/1267320/pexels-photo-1267320.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                alt="Delicious Mediterranean dish" 
                className="rounded-lg shadow-2xl w-full object-cover h-[400px]"
              />
              <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-lg shadow-lg hidden md:block">
                <img 
                  src="https://images.pexels.com/photos/1279330/pexels-photo-1279330.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                  alt="Another dish" 
                  className="w-24 h-24 object-cover rounded"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-lemon-light">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
              Why Choose Little Lemon?
            </h2>
            <p className="text-lemon-gray max-w-2xl mx-auto">
              Our Mediterranean dishes are created with passion, using fresh, locally-sourced ingredients.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {/* Feature 1 */}
            <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition duration-300 text-center">
              <div className="bg-lemon-secondary/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Star className="w-8 h-8 text-lemon-secondary" />
              </div>
              <h3 className="text-xl font-heading font-semibold mb-3">Premium Quality</h3>
              <p className="text-lemon-gray">
                We use only the freshest, highest quality ingredients in all of our dishes.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition duration-300 text-center">
              <div className="bg-lemon-secondary/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Clock className="w-8 h-8 text-lemon-secondary" />
              </div>
              <h3 className="text-xl font-heading font-semibold mb-3">Fast Service</h3>
              <p className="text-lemon-gray">
                Our efficient staff ensures your food is prepared and served promptly.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition duration-300 text-center">
              <div className="bg-lemon-secondary/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Users className="w-8 h-8 text-lemon-secondary" />
              </div>
              <h3 className="text-xl font-heading font-semibold mb-3">Family Friendly</h3>
              <p className="text-lemon-gray">
                A welcoming atmosphere for families, with something for everyone to enjoy.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Specials Section */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <div className="flex justify-between items-center mb-12">
            <h2 className="font-heading text-3xl md:text-4xl font-bold">
              This Week's Specials
            </h2>
            <Link to="/menu" className="btn btn-primary hidden md:flex">
              Full Menu
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Special Item 1 */}
            <div className="card group">
              <div className="relative overflow-hidden">
                <img 
                  src="https://images.pexels.com/photos/1640772/pexels-photo-1640772.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                  alt="Greek Salad" 
                  className="w-full h-64 object-cover group-hover:scale-105 transition duration-500"
                />
                <div className="absolute top-4 left-4 bg-lemon-secondary text-lemon-dark px-3 py-1 rounded-full font-medium text-sm">
                  Special
                </div>
              </div>
              <div className="p-6">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="font-heading text-xl font-semibold">Greek Salad</h3>
                  <span className="text-lemon-accent font-bold">$12.99</span>
                </div>
                <p className="text-lemon-gray mb-4">
                  Fresh Mediterranean salad with crispy lettuce, tomatoes, cucumbers, olives, and feta cheese.
                </p>
                <Link to="/menu" className="text-lemon-primary font-medium flex items-center gap-1 hover:underline">
                  Order a delivery <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* Special Item 2 */}
            <div className="card group">
              <div className="relative overflow-hidden">
                <img 
                  src="https://images.pexels.com/photos/2097090/pexels-photo-2097090.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                  alt="Bruschetta" 
                  className="w-full h-64 object-cover group-hover:scale-105 transition duration-500"
                />
                <div className="absolute top-4 left-4 bg-lemon-secondary text-lemon-dark px-3 py-1 rounded-full font-medium text-sm">
                  Special
                </div>
              </div>
              <div className="p-6">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="font-heading text-xl font-semibold">Bruschetta</h3>
                  <span className="text-lemon-accent font-bold">$9.99</span>
                </div>
                <p className="text-lemon-gray mb-4">
                  Grilled bread rubbed with garlic, topped with tomatoes, olive oil, salt and pepper.
                </p>
                <Link to="/menu" className="text-lemon-primary font-medium flex items-center gap-1 hover:underline">
                  Order a delivery <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* Special Item 3 */}
            <div className="card group">
              <div className="relative overflow-hidden">
                <img 
                  src="https://images.pexels.com/photos/2092897/pexels-photo-2092897.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                  alt="Lemon Dessert" 
                  className="w-full h-64 object-cover group-hover:scale-105 transition duration-500"
                />
                <div className="absolute top-4 left-4 bg-lemon-secondary text-lemon-dark px-3 py-1 rounded-full font-medium text-sm">
                  Special
                </div>
              </div>
              <div className="p-6">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="font-heading text-xl font-semibold">Lemon Dessert</h3>
                  <span className="text-lemon-accent font-bold">$7.99</span>
                </div>
                <p className="text-lemon-gray mb-4">
                  This tangy and sweet lemon dessert is the perfect way to end your Mediterranean meal.
                </p>
                <Link to="/menu" className="text-lemon-primary font-medium flex items-center gap-1 hover:underline">
                  Order a delivery <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>

          <div className="mt-10 text-center md:hidden">
            <Link to="/menu" className="btn btn-primary">
              Full Menu
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-lemon-primary text-white">
        <div className="container-custom">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-center mb-12">
            What Our Customers Say
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Testimonial 1 */}
            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg">
              <div className="flex gap-2 mb-4">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} className="w-5 h-5 fill-lemon-secondary text-lemon-secondary" />
                ))}
              </div>
              <p className="mb-6 italic">
                "The food at Little Lemon is simply outstanding. The Greek Salad was fresh and delicious, and the service was impeccable."
              </p>
              <div className="flex items-center">
                <div className="w-10 h-10 bg-lemon-secondary rounded-full mr-3"></div>
                <div>
                  <p className="font-medium">Sarah Johnson</p>
                  <p className="text-sm opacity-80">Chicago, IL</p>
                </div>
              </div>
            </div>

            {/* Testimonial 2 */}
            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg">
              <div className="flex gap-2 mb-4">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} className="w-5 h-5 fill-lemon-secondary text-lemon-secondary" />
                ))}
              </div>
              <p className="mb-6 italic">
                "I brought my family here for dinner and everyone loved it. The menu has something for everyone, and the Lemon Dessert was amazing!"
              </p>
              <div className="flex items-center">
                <div className="w-10 h-10 bg-lemon-secondary rounded-full mr-3"></div>
                <div>
                  <p className="font-medium">Michael Brown</p>
                  <p className="text-sm opacity-80">Chicago, IL</p>
                </div>
              </div>
            </div>

            {/* Testimonial 3 */}
            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg">
              <div className="flex gap-2 mb-4">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} className="w-5 h-5 fill-lemon-secondary text-lemon-secondary" />
                ))}
              </div>
              <p className="mb-6 italic">
                "The online reservation system was so easy to use, and our table was ready when we arrived. The food was delicious and worth every penny."
              </p>
              <div className="flex items-center">
                <div className="w-10 h-10 bg-lemon-secondary rounded-full mr-3"></div>
                <div>
                  <p className="font-medium">Jessica Davis</p>
                  <p className="text-sm opacity-80">Chicago, IL</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <div className="bg-lemon-primary rounded-xl overflow-hidden">
            <div className="flex flex-col md:flex-row">
              <div className="md:w-1/2 p-8 md:p-12 flex flex-col justify-center text-white">
                <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
                  Book Your Table Today
                </h2>
                <p className="mb-8 text-white/90 text-lg">
                  Experience the taste of the Mediterranean. Reserve your table now and enjoy a wonderful dining experience with family and friends.
                </p>
                <Link to="/booking" className="btn btn-secondary text-lemon-dark self-start">
                  Make a Reservation
                </Link>
              </div>
              <div className="md:w-1/2">
                <img 
                  src="https://images.pexels.com/photos/67468/pexels-photo-67468.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                  alt="Restaurant interior" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;