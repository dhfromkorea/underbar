/*jshint eqnull:true, expr:true*/

var _ = {};

(function() {

    // Returns whatever value is passed as the argument. This function doesn't
    // seem very useful, but remember it--if a function needs to provide an
    // iterator when the user does not pass one in, this will be handy.
    _.identity = function(val) {
        return val;
    };

    /**
     * COLLECTIONS
     * ===========
     *
     * In this section, we'll have a look at functions that operate on collections
     * of values; in JavaScript, a 'collection' is something that can contain a
     * number of values--either an array or an object.
     *
     *
     * IMPORTANT NOTE!
     * ===========
     *
     * The .first function is implemented for you, to help guide you toward success
     * in your work on the following functions. Whenever you see a portion of the
     * assignment pre-completed, be sure to read and understand it fully before
     * you proceed. Skipping this step will lead to considerably more difficulty
     * implementing the sections you are responsible for.
     */

    // Return an array of the first n elements of an array. If n is undefined,
    // return just the first element.
    _.first = function(array, n) {
        if (n === undefined || n === null) {
            return array[0];
        } else {
            return array.slice(0, n);
        }
    };

    // Like first, but for the last elements. If n is undefined, return just the
    // last element.
    _.last = function(array, n) {
        var length = array.length;
        if (n >= length) return array;
        return n === undefined ? array[length - 1] : array.slice(length - n, length);
    };

    // Call iterator(value, key, collection) for each element of collection.
    // Accepts both arrays and objects.
    //
    // Note: _.each does not have a return value, but rather simply runs the
    // iterator function over each item in the input collection.
    _.each = function(collection, iterator) {
        if (typeof collection === "object") {
            if (Array.isArray(collection)) {
                for (var i = 0; i < collection.length; i++) {
                    var args = [collection[i], i, collection];
                    iterator.apply(this, args);
                }
            } else {
                for (var prop in collection) {
                    var args2 = [collection[prop], prop, collection];
                    iterator.apply(this, args2);
                }
            }
        } else {
            console.log("argument typeError: this is not an object");
        }
    };

    // Returns the index at which value can be found in the array, or -1 if value
    // is not present in the array.
    _.indexOf = function(array, target) {
        // TIP: Here's an example of a function that needs to iterate, which we've
        // implemented for you. Instead of using a standard `for` loop, though,
        // it uses the iteration helper `each`, which you will need to write.
        var location = -1,
            is_found = false;
        _.each(array, function(item, index, list) {
            if (!is_found && item === target) {
                location = index;
                is_found = true;
            }
        });
        return location;
    };

    // Return all elements of an array that pass a truth test.
    _.filter = function(collection, test) {
        var result = [];
        _.each(collection, function(item, index, list) {
            if (test(item)) {
                result.push(item);
            }
        });
        return result;
    };

    // Return all elements of an array that don't pass a truth test.
    _.reject = function(collection, test) {
        // TIP: see if you can re-use _.filter() here, without simply
        // copying code in and modifying it
        return _.filter(collection, function(value) {
            return !test(value);
        });
    };

    // Produce a duplicate-free version of the array.
    _.uniq = function(array) {
        var result = [];
        _.each(array, function(item, index, list) {
            if (_.indexOf(result, item) === -1) {
                result.push(item);
            }
        });
        return result;
    };

    // Return the results of applying an iterator to each element.
    _.map = function(collection, iterator) {
        // map() is a useful primitive iteration function that works a lot
        // like each(), but in addition to running the operation on all
        // the members, it also maintains an array of results.

        var result = [];
        _.each(collection, function(value, key, collection) {
            var args = Array.prototype.slice.call(arguments);
            result[key] = iterator.apply(this, args);
        });
        return result;
    };

    /*
     * TIP: map is really handy when you want to transform an array of
     * values into a new array of values. _.pluck() is solved for you
     * as an example of this.
     */

    // Takes an array of objects and returns and array of the values of
    // a certain property in it. E.g. take an array of people and return
    // an array of just their ages
    _.pluck = function(collection, key) {
        // TIP: map is really handy when you want to transform an array of
        // values into a new array of values. _.pluck() is solved for you
        // as an example of this.
        return _.map(collection, function(item) {
            return item[key];
        });
    };

    // Calls the method named by methodName on each value in the list.
    // Note: you will nead to learn a bit about .apply to complete this.
    _.invoke = function(collection, functionOrKey, args) {
        return _.map(collection, function(value, key, collection, args) {
            args = Array.prototype.slice.call(arguments);
            if (typeof functionOrKey === "function") {
                return functionOrKey.apply(value, args);
            } else {
                return value[functionOrKey].apply(value, args);
            }

        });
    };

    // Reduces an array or object to a single value by repetitively calling
    // iterator(previousValue, item) for each item. previousValue should be
    // the return value of the previous iterator call.
    //
    // You can pass in an initialValue that is passed to the first iterator
    // call. If initialValue is not explicitly passed in, it should default to the
    // first element in the collection.
    //
    // Example:
    //   var numbers = [1,2,3];
    //   var sum = _.reduce(numbers, function(total, number){
    //     return total + number;
    //   }, 0); // should be 6
    _.reduce = function(collection, iterator, accumulator) {
        if (3 > arguments.length) accumulator = _.first(collection);
        _.each(collection, function(value, key, collection) {
            var args = [accumulator, value];
            accumulator = iterator.apply(context, args);
        });
        return accumulator;
    };

    // Determine if the array or object contains a given value (using `===`).

    _.contains = function(collection, target) {
        if (Array.isArray(collection)) {
            return (_.indexOf(collection, target) === -1) ? false : true;
        } else {
            return _.reduce(collection, function(has_value, value) {
                if (has_value) return true;
                if (value === target) return true;
            }, false);
        }

    };


    // Determine whether all of the elements match a truth test.
    _.every = function(collection, iterator) {
        // TIP: Try re-using reduce() here.
        var predicate = iterator || _.identity;
        return _.reduce(collection, function(passed, item) {
            if (!passed) return false;
            return !!predicate(item);
        }, true);
    };

    // Determine whether any of the elements pass a truth test. If no iterator is
    // provided, provide                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               a default one
    _.some = function(collection, iterator) {
        // TIP: There's a very clever way to re-use every() here.
        var predicate = iterator || _.identity;
        if (Array.isArray(collection) && collection.length === 0) return false;
        if (_.every(collection, predicate)) return true;
        var reverse_test = _.every(collection, function(value) {
            return !predicate(value);
        });
        return (reverse_test ? false : true);
    };


    /**
     * OBJECTS
     * =======
     *
     * In this section, we'll look at a couple of helpers for merging objects.
     */

    // Extend a given object with all the properties of the passed in
    // object(s).
    //
    // Example:
    //   var obj1 = {key1: "something"};
    //   _.extend(obj1, {
    //     key2: "something new",
    //     key3: "something else new"
    //   }, {
    //     bla: "even more stuff"
    //   }); // obj1 now contains key1, key2, key3 and bla
    _.extend = function(obj) {
        var args = Array.prototype.slice.call(arguments);
        var dest = args[0];
        args = args.splice(1, args.length);
        // console.log(args);
        _.each(args, function(key, index, list) {
            _.each(key, function(value, prop, object) {
                dest[prop] = value;
            });
        });
        return dest;
    };

    // Like extend, but doesn't ever overwrite a key that already
    // exists in obj
    _.defaults = function(obj) {
        var args = Array.prototype.slice.call(arguments);
        var dest = args[0];
        args = args.splice(1, args.length);
        // console.log(args);
        _.each(args, function(key, index, list) {
            _.each(key, function(value, prop, object) {
                if (dest[prop] === undefined) dest[prop] = value;
            });
        });
        return dest;
    };


    /**
     * FUNCTIONS
     * =========
     *
     * Now we're getting into function decorators, which take in any function
     * and return out a new version of the function that works somewhat differently
     */

    // Return a function that can be called at most one time. Subsequent calls
    // should return the previously returned value.
    _.once = function(func) {
        // TIP: These variables are stored in a "closure scope" (worth researching),
        // so that they'll remain available to the newly-generated function every
        // time it's called.
        var alreadyCalled = false;
        var result;

        // TIP: We'll return a new function that delegates to the old one, but only
        // if it hasn't been called before.
        return function() {
            if (!alreadyCalled) {
                // TIP: .apply(this, arguments) is the standard way to pass on all of the
                // infromation from one function call to another.
                result = func.apply(this, arguments);
                alreadyCalled = true;
            }
            // The new function always returns the originally computed result.
            return result;
        };
    };

    // Memoize an expensive function by storing its results. You may assume
    // that the function takes only one argument and that it is a primitive.
    //
    // _.memoize should return a function that when called, will check if it has
    // already computed the result for the given argument and return that value
    // instead if possible.
    _.memoize = function(func) {
        var result = {};
        return function() {
            var args = Array.prototype.slice.call(arguments);
            if (result.hasOwnProperty(args)) {
                return result[args];
            } else {
                result[args] = func.apply(this, args);
                return result[args];
            }
        };
    };

    // Delays a function for the given number of milliseconds, and then calls
    // it with the arguments supplied.
    //
    // The arguments for the original function are passed after the wait
    // parameter. For example _.delay(someFunction, 500, 'a', 'b') will
    // call someFunction('a', 'b') after 500ms
    _.delay = function(func, wait) {
        var n = wait || 5000;
        var args = Array.prototype.slice.call(arguments, 2);
        return setTimeout(function() {
            func.apply(this, args);
        }, n);
    };


    /**
     * ADVANCED COLLECTION OPERATIONS
     * ==============================
     */

    // Randomizes the order of an array's contents.
    //
    // TIP: This function's test suite will ask that you not modify the original
    // input array. For a tip on how to make a copy of an array, see:
    // http://mdn.io/Array.prototype.slice
    _.shuffle = function(array) {
        var result = Array.prototype.slice(array);
        var rand_int = function(min, max) {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        };
        var rand_num, temp;
        _.each(result, function(item, index) {
            rand_num = rand_int(0, result.length - 1);
            temp = result[index];
            result[index] = result[rand_num];
            result[rand_num] = temp;
        });
        return result;
    };



    /**
     * Note: This is the end of the pre-course curriculum. Feel free to continue,
     * but nothing beyond here is required.
     */


    // Sort the object's values by a criterion produced by an iterator.
    // If iterator is a string, sort objects by that property with the name
    // of that string. For example, _.sortBy(people, 'name') should sort
    // an array of people by their name.
    _.sortBy = function(collection, iterator) {};

    // Zip together two or more arrays with elements of the same index
    // going together.
    //
    // Example:
    // _.zip(['a','b','c','d'], [1,2,3]) returns [['a',1], ['b',2], ['c',3], ['d',undefined]]
    _.zip = function() {
        var args = Array.prototype.slice.call(arguments);
        var result = [];
        var max_length = args[0].length;
        _.each(args, function(item, index) {
            var element_concat = [];
            console.log(item[index]);
            _.each(args, function(item) {
                // console.log(item[i]);
                element_concat.push(item[index]);
            })
            // console.log(element_concat);
            result[i] = element_concat;
        })
    };

    // Takes a multidimensional array and converts it to a one-dimensional array.
    // The new array should contain all elements of the multidimensional array.
    //
    // Hint: Use Array.isArray to check if something is an array
    _.flatten = function(nestedArray, result) {};

    // Takes an arbitrary number of arrays and produces an array that contains
    // every item shared between all the passed-in arrays.
    _.intersection = function() {};

    // Take the difference between one array and a number of other arrays.
    // Only the elements present in just the first array will remain.
    _.difference = function(array) {};


    /**
     * MEGA EXTRA CREDIT
     * =================
     */

    // Returns a function, that, when invoked, will only be triggered at most once
    // during a given window of time.
    //
    // See the Underbar readme for details.
    _.throttle = function(func, wait) {};

}).call(this);