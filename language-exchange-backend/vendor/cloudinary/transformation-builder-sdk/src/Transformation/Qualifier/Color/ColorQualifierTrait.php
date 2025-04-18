<?php
/**
 * This file is part of the Cloudinary PHP package.
 *
 * (c) Cloudinary
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace Cloudinary\Transformation;

/**
 * Trait ColorQualifierTrait
 *
 * @api
 */
trait ColorQualifierTrait
{
    /**
     * Sets the color.
     *
     * @param string $color The color.
     *
     */
    public static function color(string $color): ColorQualifier
    {
        return new ColorQualifier($color);
    }
}
