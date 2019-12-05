interface Iterator<T> {
    /**
     * Returns the current item and moves the iterator to the next item
     * in the collection. Note that the next() method returns the
     * <i>first</i> item in the collection when it's first called.
     *
     * @return The next item in the collection.
     */
    next():any

    /**
     * Checks if a next item exists.
     *
     * @return True if a next item exists, otherwise false.
     */
    hasNext():Boolean

    /**
     * Moves the iterator to the first item in the collection.
     */
    start():void

    /**
     * Grants access to the current item being referenced by the iterator.
     * This provides a quick way to read or write the current data.
     */
    data():any

    /**
     * @private
     */
    data(obj:any):void
}