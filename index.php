<?php
/**
 * Created by PhpStorm.
 * User: Dan
 * Date: 16-Jan-19
 * Time: 8:16 AM
 */

include 'database.php';
include 'functions.php';
include 'header.php';

$res = get_all_products();
?>
    <div class="content">
        <div class="controls">
            <div class="control-group">
                <label for="num-products">Numar de produse pe rand: </label>
                <select id="num-products" name="num-products">
                    <option value="4">4</option>
                    <option value="3">3</option>
                    <option value="2">2</option>
                </select>
            </div>
            <div class="control-group">
                <button id="delete-selected" name="delete-selected">Delete Selected</button>
            </div>

        </div>

        <div class="products">

            <?php
            $index = 0;
            while ($content = $res->fetch_assoc()):
                $lineNum =floor( $index/4);
                if($index%4==0){
                    echo '<div class="select_row"><button class="line_button" name="line'.$lineNum.'">Select Line</button></div>';
                }

                ?>
                <div id="<?php echo $content['id'] ?>" class="single-product line<?php echo $lineNum; ?>">
                    <div class="prod-title"><?php echo $content['Nume']; ?></div>
                    <div class="prod-image">
                        <img src="<?php echo $content['ImageURL']; ?>" alt="prod_image"/>
                    </div>
                </div>

            <?php
            $index++;
            endwhile;
            ?>
        </div>

    </div>
<?php

include 'footer.php';